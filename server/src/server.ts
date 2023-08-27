import Fastify from "fastify"
import cors from '@fastify/cors'
import { projectRoutes } from "./routes/project"
import { cardListtRoutes } from "./routes/cardList"
import { cardRoutes } from "./routes/card"
import { documentRoutes } from "./routes/document"


async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(projectRoutes)
    await fastify.register(cardListtRoutes)
    await fastify.register(cardRoutes)
    await fastify.register(documentRoutes)







    await fastify.listen({port: 3333})
}

bootstrap();