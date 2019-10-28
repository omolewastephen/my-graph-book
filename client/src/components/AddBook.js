import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addbookMutation,getBooksQuery} from "../queries/queries";




class AddBook extends Component{

constructor(props){
	super(props);
	this.state = {
		name: '',
		genre: '',
		authorid: ''
	}
}

displayAuthors(){
	var data = this.props.getAuthorsQuery;
	console.log(this.props);

	if(data.loading){
		return ( <option disabled>Loading Authors...</option> )
	}else{
		return data.authors.map(author => {
			return ( <option key={author.id} value={author.id}>{author.name}</option> )
		})
	}
}

submitForm(e){
	e.preventDefault();
	this.props.addbookMutation({
		variables: {
			name: this.state.name,
			genre: this.state.genre,
			authorid: this.state.authorid,
		},
		refetchQueries: [
			{query: getBooksQuery}
		] 
	});
}

 render(){
 	 return (
	    <div>
	      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label>Book Name:</label>
					<input type="text" onChange={ (e) => this.setState({name: e.target.value})}/>
				</div>

				<div className="field">
					<label>Book Genre:</label>
					<input type="text" onChange={ (e) => this.setState({genre: e.target.value})}/>
				</div>

				<div className="field">
					<label>Author:</label>
					<select onChange={ (e) => this.setState({authorid: e.target.value})}>
						<option>Select Author</option>
						{ this.displayAuthors()}
					</select>
				</div>

				<button>Add book</button>
		  </form>
	    </div>
	  );
 }
  
}

export default compose(
	graphql(getAuthorsQuery,{name: "getAuthorsQuery"}),
	graphql(addbookMutation,{name: "addbookMutation"})
)(AddBook);
