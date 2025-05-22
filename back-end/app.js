import ENV from './config/env.js'
import express from 'express'
import connectMongoDB from './config/dbMongo.js'
import candidaturesRouter from './routes/candidatures.routes.js'
import cors from 'cors'

const app = express()

//CONNEXION MONGO
connectMongoDB(ENV.URI_MONGO, ENV.DB_NAME);

// MIDLEWARE 
app.use(express.json())
app.use(cors())

//PRIFIX appelé dans serveur .js
app.use('/api/candidatures',candidaturesRouter);
//app.use('/api/statistiques');

export default app;