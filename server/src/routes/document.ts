import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from "zod";

export async function documentRoutes(fastify: FastifyInstance){
    fastify.post('/docs', async (req, res) => {
        const createDocumentBody = z.object({
            name: z.string(),
            projectId: z.string(),
        })

        const { name, projectId } = createDocumentBody.parse(req.body)

        await prisma.document.create({
            data: {
                name,
                projectId,
            }
        })
    })


    fastify.get('/docs/:id/cards', async (req, res) => {

        
        const DocumentIdBody = z.object({
            id: z.string(),
        })

        const {id} = DocumentIdBody.parse(req.params)

        

        const docs = prisma.document.findUnique({
            where: {
                id
            },
            include: {
                cards: true
            }
        })

        if(!docs){
            return res.status(400).send({
                message: "Client not found"
            })
        }

        return docs;
    })

}