import express from 'express'

// ? Middlewares
import { authenticate } from './middlewares/auth.js'

// ? Env variables
import { PORT } from './config.js'

// ? GraphQL
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema.js'

// ? MongoDB
import { connect } from './db/index.js'

const app = express()
connect()

// * Middlewars
app.use(authenticate)
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.get('/', (req, res ) => res.send("Welcome to mi GraphQL-API"))

app.listen(PORT)
console.log("Server is running on port", PORT)