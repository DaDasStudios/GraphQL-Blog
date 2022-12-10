import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { User, Post, Comment } from "../models/index.js";

export const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "The user object without password",
    fields: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    },
});

export const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "The post object",
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: {
            type: UserType,
            resolve: async (parent) => {
                return await User.findById(parent.authorID);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: async (parent) => await Comment.find({ postID: parent._id }),
        },
    }),
});

export const CommentType = new GraphQLObjectType({
    name: "CommentType",
    description: "The comment type",
    fields: {
        _id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve: async (parent) => {
                return await User.findById(parent.userID);
            },
        },
        post: {
            type: PostType,
            resolve: async (parent) => {
                return await Post.findById(parent.postID);
            },
        },
    },
});
