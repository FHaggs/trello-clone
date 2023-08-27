import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from "zod";


export async function cardListtRoutes(fastify: FastifyInstance){

    fastify.get('/lists', async () => {
        const cardLists = prisma.cardList.findMany({
            include: {
                cards: true
            }
        })
        return cardLists;
    })
    fastify.post('/lists', async (req) => {

        const createCardListBody = z.object({
            name: z.string(),

        })

        const { name } = createCardListBody.parse(req.body)

        await prisma.cardList.create({
            data: {
                name
            }
        })
    })
}
