import "../App.css";
import React from "react";
import PostService from "../services/PostService";

class NewTask extends React.Component {
	constructor(props) {
		super(props);
	}
	handleChange = (event) => {
		this.setState({ title: event.target.value });
	};
	handleKeyDown = (event) => {
		if (event.key === "Enter") {
			this.submitEdit();
			this.props.handler();
		}
	};
	submitEdit = () => {
		console.log("saved: ", this.state.title);
		PostService.addNewTask({ cat_id: this.props.cat_id, title: this.state.title })
			.then((response) => {
				return response;
			})
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div>
				<input type="checkbox"></input>
				<input
					type="text"
					className="form-control-plaintext"
					defaultValue=""
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				></input>
			</div>
		);
	}
}
export default NewTask;
