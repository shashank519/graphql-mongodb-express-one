import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLList,
	GraphQLID
} from "graphql";

import PostModel from "./../../models/post";
import { postType } from "./post";

export const userType = new GraphQLObjectType({
	name: "User",
	description: "User API",
	fields: () => ({
		_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		email: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		posts: {
			type: GraphQLList(postType),
			resolve(user) {
				const { _id } = user;
				return PostModel.find({ uid: _id }).exec();
			}
		}
	})
});

export const userInputType = new GraphQLInputObjectType({
	name: "UserInput",
	description: "Insert USer",
	fields: () => ({
		email: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		}
	})
});
