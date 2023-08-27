import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from "zod";

export async function projectRoutes(fastify: FastifyInstance){
    fastify.post('/clients', async (req, res) => {
        const createClientBody = z.object({
            name: z.string(),
            description: z.string().nullable()
        })

        const { name, description } = createClientBody.parse(req.body)

        await prisma.project.create({
            data: {
                name,
                description,
            }
        })
    })

    fastify.get('/clients', async () => {
        const clients = prisma.project.findMany({})
        return clients;
    })
    fastify.get('/clients/:id', async (req, res) => {

        
        const ClientIdBody = z.object({
            id: z.string(),
        })

        const {id} = ClientIdBody.parse(req.params)

        

        const client = prisma.project.findUnique({
            where: {
                id
            },
            include: {
                documents: true
            }
        })

        if(!client){
            return res.status(400).send({
                message: "Client not found"
            })
        }

        return client;
    })

}