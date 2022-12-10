import { GraphQLID, GraphQLList } from 'graphql'
import { User, Post, Comment } from '../models/index.js'
import { CommentType, PostType, UserType } from './types.js'

export const users = {
    type: new GraphQLList(UserType),
    description: "Returns a list of users in the DB",
    resolve: async () => await User.find()
}

export const user = {
    type: UserType,
    description: "Returns a single user by ID in the DB",
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, { id }) => await User.findById(id)
}

export const posts = {
    type: new GraphQLList(PostType),
    description: "Returns a list of a user's posts",
    resolve: async (_, __, { verifiedUser }) => {
        return await Post.find({authorID: verifiedUser._id})
    }
}

export const allPosts = {
    type: new GraphQLList(PostType),
    description: "All the users saved",
    resolve: async () => await Post.find()
}

export const post = {
    type: PostType,
    description: "Returns a single post",
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, {id}) => {
        return await Post.findById(id)
    }
}

export const allComments = {
    type: new GraphQLList(CommentType),
    description: "Gets all comments",
    resolve: async () => await Comment.find()
}

export const comment = {
    type: CommentType,
    description: "A single comment",
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, { id }) => await Comment.findById(id)
}