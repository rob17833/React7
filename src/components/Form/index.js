import React from 'react';
import './index';

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			poster:'',
			comment:''
		}
		this.onChange = this.onChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	onChange(e){
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	submitForm(e){
		e.preventDefault();
		const config = {
			method: 'POST',
			headers: {
				"Content-type":"application/json",
			},
			body: JSON.stringify(this.state),
		};

		const url = 'http://campus-bordeaux.ovh:3001/api/quests/movies/';

		fetch(url, config)
		.then(res => res.json())
			.then(res => {
				if (res.error) {
					alert(res.error);
				} else {
					alert(`Film ajoute avec l' ID ${res}!`);
				}
			}).catch(e => {
				console.error(e);
				alert('a remplacer');
			})
	}

	render(){
		return(
			<div className="FormMovies">
				<h1>Saisie d un film</h1>
				<form onSubmit={this.submitForm}>
					<fieldset>
						<div className="form-data">
							<label htmlFor="name">Titre du film</label>
							<input
							 type="text"
							 id="name"
							 name="name"
							 onChange={this.onChange}
							 value={this.state.name}
							/>
						</div>

						<div className="form-data">
							<label htmlFor="poster">Poster</label>
							<input
							 type="url"
							 id="poster"
							 name="poster"
							 onChange={this.onChange}
							 value={this.state.poster}
							/>
						</div>

						<div className="form-data">
							<label htmlFor="comment">Comment</label>
							<textarea 
								name="comment"
							  id="comment"
							  cols="30"
							  rows="10"
							  onChange={this.onChange}
							  value={this.state.comment}
						  >
						  </textarea>
						</div>
						<div className="form-data">
								<input type='submit' value='Envoyer' />
						</div>
					</fieldset>
				</form>
			</div>
		)
	}
}

export default Form;