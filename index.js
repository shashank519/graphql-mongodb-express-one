import express from "express";
import mongoose from "mongoose";
import graphqlHTTP from "express-graphql";

import schema from "./graphql";

const app = express();

mongoose.connect(
	`mongodb://shd519:shashank519@ds121413.mlab.com:21413/graphql-api`
);

const db = mongoose.connection;
db.on("error", () => console.log("failed to connect to database")).once(
	"open",
	() => console.log("Connected to mongodb")
);

app.get("/", (req, res) => {
	res.send("Hello world, This is graphql api");
});

// Graphql API endpoint
app.use(
	"/graphql",
	graphqlHTTP(() => ({
		schema,
		graphiql: true,
		pretty: true
	}))
);

app.listen(3000, () => {
	console.log("Graphql API running at port: 3000");
});
