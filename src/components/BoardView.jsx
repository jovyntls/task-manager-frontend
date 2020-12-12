import "../App.css";
import PostService from "../services/PostService";
import React from "react";
import Card from "./Card";

class BoardView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount() {
		PostService.fetchTasks()
			.then((response) => {
				this.setState({ tasks: response.data });
			})
			.catch((err) => console.log(err));
		PostService.fetchCats()
			.then((response) => {
				this.setState({ cats: response.data });
			})
			.catch((err) => console.log(err));
	}
	isValidArray(data) {
		return Array.isArray(data) && data.length !== 0;
	}
	showCards(data) {
		return this.isValidArray(data) && this.isValidArray(this.state.tasks)
			? data.map((item, i) => <Card key={i} cat={item} tasks={this.state.tasks} />)
			: "";
	}
	render() {
		return (
			<div>
				<div>HELLO BOARD VIEW</div>
				{this.showCards(this.state.cats)}
			</div>
		);
	}
}

export default BoardView;
