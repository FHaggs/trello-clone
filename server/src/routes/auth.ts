import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function authRoutes(fastify: FastifyInstance){
    fastify.post('/users', async (req) => {
        const createUserBody = z.object({
            acess_token: z.string(),
        })

        const {acess_token} = createUserBody.parse(req.body)

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${acess_token}`
            }
        })

        const userData = await userResponse.json()

        const userInfoSchema = z.object({
            email: z.string().email(),
            name: z.string()
        }) 

        const userInfo = userInfoSchema.parse(userData)

        console.log(userInfo)

    })


}