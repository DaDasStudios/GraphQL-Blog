import { model, Schema } from 'mongoose'

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default model('Comment', CommentSchema)