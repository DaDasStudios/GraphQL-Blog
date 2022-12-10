import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { users, user, posts, post, allPosts, allComments, comment } from './queries.js'
import { register, login, createPost, updatePost, deletePost, createComment, updateComment, deleteComment } from './mutations.js'

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        users,
        user,
        posts,
        post,
        allPosts,
        allComments,
        comment
    }
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost,
        createComment,
        updateComment,
        deleteComment
    }
})

export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})


