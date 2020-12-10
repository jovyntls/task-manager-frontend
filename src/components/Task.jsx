import "../App.css";
import React from "react";
import PostService from "../services/PostService";

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {title: this.props.data.title};
	}
	handleChange = (event) => {
		this.setState({title: event.target.value});
	}
	handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			console.log("saved: ", this.state.title)
			console.log(this.props.data.id)
			PostService.editTaskTitle({id: this.props.data.id, title: this.state.title})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => console.log(err));
		}
	  }
	render() {
		return (
			<div>
			<li>{this.props.data.title}</li>
			<input 
				type="text" 
				className="form-control-plaintext" 
				defaultValue={this.props.data.title}
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
				></input>
			</div>
		)
	}
}
export default Task;
