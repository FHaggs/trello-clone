import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from "zod";

export async function cardRoutes(fastify: FastifyInstance){
    fastify.post('/cards', async (req) => {
        const createClientBody = z.object({
            name: z.string(),
            description: z.string().nullable(),
            documentId: z.string(),
            creatorUserId: z.string(),
            cardListId: z.string().nullable()
            
        })

        const { name, description, documentId, creatorUserId, cardListId } = createClientBody.parse(req.body)

        await prisma.card.create({
            data: {
                name,
                description,
                documentId,
                creatorUserId,
                cardListId,
            }
        })
    })
    fastify.post('/cardsUpdate', async (req) => {
        const createClientBody = z.object({
            id: z.string(),
            newCardListId: z.string()
        })

        const {id, newCardListId} = createClientBody.parse(req.body)

        await prisma.card.update({
            where: {
                id,
            },
            data: {
              cardListId: newCardListId,  
            }
        })
    })

}
