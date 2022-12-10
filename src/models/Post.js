import { model, Schema } from 'mongoose'

const PostSchema = new Schema({
    authorID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Post', PostSchema)