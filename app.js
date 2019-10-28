const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect("mongodb://lewa:11toMtom.@ds139768.mlab.com:39768/graph-book-db");
mongoose.connection.once('open',() => {
	console.log("Connected");
});



app.use("/graphql",graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log("Listening for request on port 4000");
});