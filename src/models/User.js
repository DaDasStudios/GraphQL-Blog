import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('User', UserSchema)