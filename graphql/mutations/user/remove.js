import { GraphQLNonNull, GraphQLID } from "graphql";
import { userType } from "./../../types/user";
import UserModel from "./../../../models/user";

export default {
	type: userType,
	args: {
		id: {
			name: "id",
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve(parent, params) {
		const removedUser = UserModel.findByIdAndRemove(params.id).exec();
		if (!removedUser) {
			throw new Error("Error removing User");
		}

		return removedUser;
	}
};
