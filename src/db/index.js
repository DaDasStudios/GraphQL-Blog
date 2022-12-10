import mongoose from 'mongoose'
import { DBPASS, DBUSER, DBURI } from '../config.js'

mongoose.set('strictQuery', true)

export const connect = () => {
    mongoose.connect(DBURI, {
        user: DBUSER,
        pass: DBPASS,
        dbName: "graphql"
    }).then(() => {
        console.log('MongoDB is connected')
    }).catch(e => {
        console.log(e)
    })
} 