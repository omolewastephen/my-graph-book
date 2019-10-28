import {gql} from 'apollo-boost';

const getBooksQuery = gql`
	{
		books{
			name
			id
		}
	}
`

const getAuthorsQuery = gql`
	{
		authors{
			name
			id
		}
	}
`

const getBookQuery = gql`
	query($id: ID){
		book(id: $id){
			id
			genre
			author{
				id
				name
				books{
					name
					id
				}
			}
		}
	}
`

const addbookMutation = gql`
	mutation($name: String!, $genre: String!, $authorid: ID!){
		addBook(name:$name,genre:$genre,authorid:$authorid){
			name
			id
		}
	}
`

export { getAuthorsQuery, getBooksQuery, addbookMutation,getBookQuery}; 