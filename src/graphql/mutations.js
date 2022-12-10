import { GraphQLID, GraphQLString } from "graphql";
import { User, Post, Comment } from "../models/index.js";
import { createJWTtoken } from "../util/auth.js";
import { CommentType, PostType } from "./types.js";

export const register = {
    type: GraphQLString,
    description: "Register a new user and returns a token",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    resolve: async (_, { username, email, password, displayName }) => {
        const newUser = new User({
            username,
            email,
            password,
            displayName,
        });
        const token = createJWTtoken({
            _id: newUser._id,
            username: newUser.username,
            displayName: newUser.displayName,
            email: newUser.email,
        });
        console.log(newUser);
        //await newUser.save()
        return token;
    },
};

export const login = {
    type: GraphQLString,
    description: "Login a registered user and returns a token",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const user = await User.findOne({
            email: args.email,
            password: args.password,
        });

        if (!user) throw new Error("Invalid Credentials");
        else {
            return createJWTtoken({ user });
        }
    },
};

export const createPost = {
    type: PostType,
    description: "Creates a new publication",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    resolve: async (_, { title, body }, { verifiedUser }) => {
        const newPost = new Post({
            authorID: verifiedUser._id,
            title,
            body,
        });
        await newPost.save();
        return newPost;
    },
};

export const updatePost = {
    type: PostType,
    description: "Updates a created post",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    resolve: async (_, { id, title, body }, { verifiedUser }) => {
        if (verifiedUser) {
            return await Post.findOneAndUpdate(
                { _id: id, authorID: verifiedUser._id },
                { title, body },
                { new: true }
            );
        } else throw new Error("Unauthorized");
    },
};

export const deletePost = {
    type: PostType,
    description: "Deletes a post",
    args: {
        id: { type: GraphQLID },
    },
    resolve: async (_, { id }, { verifiedUser }) => {
        if (verifiedUser) {
            return await Post.findOneAndDelete({
                _id: id,
                authorID: verifiedUser._id,
            });
        } else throw new Error("Unauthorized");
    },
};

export const createComment = {
    type: CommentType,
    description: "Creates a comment into a post",
    args: {
        comment: { type: GraphQLString },
        postID: { type: GraphQLID },
    },
    resolve: async (_, { comment, postID }, { verifiedUser }) => {
        if (verifiedUser) {
            const newComment = new Comment({ comment, postID, userID: verifiedUser._id })
            await newComment.save()
            return newComment
        } else throw new Error("Unauthorized");
    }
}

export const updateComment = {
    type: CommentType,
    description: "Updates a comment",
    args: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString }
    },
    resolve: async (_, { comment, id }, { verifiedUser }) => {
        if (verifiedUser) {
            return await Comment.findOneAndUpdate({ _id: id, userID: verifiedUser._id }, { comment }, { new: true })
        } else throw new Error("Unauthorized");
    }
}

export const deleteComment = {
    type: CommentType,
    description: "Deletes a comment",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, { id }, { verifiedUser }) {
        if (verifiedUser) {
            return await Comment.findOneAndDelete({ _id: id, userID: verifiedUser._id })
        } else throw new Error("Unauthorized");
    }
}