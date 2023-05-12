import helmet from 'helmet'
import http from 'http'
import compress from 'compression'
import cors from 'cors'
import LOGGER from '@config/logger'
import ENV from '@config/environment'
import express, { Application } from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import { MyContext } from 'types/common/interfaces'

export class Server {
    readonly app!: Application
    readonly httpServer!: http.Server
    readonly server!: ApolloServer
    readonly routePrefix!: string

    private port!: string | number

    private static _instance: Server

    constructor() {
        if (Server._instance) {
            return Server._instance
        }
        this.app = express()
        this.httpServer = http.createServer(this.app)
        this.server = new ApolloServer<MyContext>({
            typeDefs: `
                type Query {
                    hello: String
                }
            `,
            resolvers: {
                Query: {
                    hello: () => 'Hello World!'
                }
            },
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })],
        })
        this.routePrefix = '/graphql'
        this.port = ENV.PORT
        this.startApolloServer().then(() => this.routes())
        this.middlewares()
        Server._instance = this
    }

    private async startApolloServer(): Promise<void> {
        return await this.server.start()
    }

    private middlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(helmet.xssFilter())
        this.app.use(helmet.noSniff())
        this.app.use(helmet.hidePoweredBy())
        this.app.use(helmet.frameguard({ action: 'deny' }))
        this.app.use(compress())
        this.app.use(LOGGER.express)
    }

    private routes(): void {
        this.app.use(this.routePrefix, cors<cors.CorsRequest>(), expressMiddleware(this.server, {
            context: async ({ req }) => ({ token: req.headers.token })
        }))
    }

    public async start(): Promise<void> {
        await new Promise<void>((resolve) => this.httpServer.listen({ port: this.port }, resolve))
        LOGGER.access.info(`🚀 Server ready at http://localhost:${this.port}${this.routePrefix}`)
    }
}