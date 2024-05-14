import Server from './class/server.class'
import cors from 'cors'
import express from 'express'
import cars from  './routes/cars.routes'
import fileForge from "express-fileupload"

async function configureServer() {
    const server = Server.getInstance()
    

    server.getApp().enable('trust proxy')
    server.getApp().use(
        fileForge({
            createParentPath: true,
    }))
    server.getApp().use(express.urlencoded({ extended: true, limit: '50mb' }))
    server.getApp().use(express.json({ limit: '50mb' }))
    server.getApp().use(cors({ origin: true, credentials: true }))
    server.getApp().use('/api', cars)


    try {
        await server.start()
    } catch (error) {
        console.error(`Error starting server: ${error}`)
        process.exit(1)
    }
}

configureServer()