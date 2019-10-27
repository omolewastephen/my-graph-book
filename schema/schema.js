const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,GraphQLInt,GraphQLList } = graphql;
const Book = require('../model/book');
const Author = require('../model/author');

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID},
		name: {type: GraphQLString },
		genre: {type: GraphQLString },
		author:{
			type: AuthorType,
			resolve(parent,args){
				//return _.find(authors,{id: parent.authorid})
			}
		}
	}) 
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID},
		name: {type: GraphQLString },
		age: {type: GraphQLInt },
		books:{
			type: new GraphQLList(BookType),
			resolve(parent,args){
				//return _.filter(books,{authorid: parent.id})
			}
		}
	}) 
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				// Code to get data from db
				//return _.find(books,{id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				// Code to get data from db
				//return _.find(authors,{id: args.id});
			}
		},
		books:{
			type: new GraphQLList(BookType),
			resolve(parent,args){
				//return books
			}
		},
		authors:{
			type: new GraphQLList(AuthorType),
			resolve(parent,args){
				//return authors
			}
		}

	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor:{
			type: AuthorType,
			args:{
				name: {type: GraphQLString},
				age: {type: GraphQLInt},
			},
			resolve(parent,args){
			let author = new Author({
				name: args.name,
				age: args.age
			});

			author.save();
		   }
		}
		
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})