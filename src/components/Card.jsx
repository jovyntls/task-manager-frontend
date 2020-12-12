import "../App.css";
import PostService from "../services/PostService";
import React from "react";
import Task from "./Task";
import NewTask from "./NewTask";

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = { refresh: false };
	}

	isValidArray(data) {
		return !Array.isArray(data) || !data.length;
	}
	showTasks(data) {
		return this.isValidArray(data) ? "" : data.map((item, i) => <Task data={item} key={i} />);
	}
	handler = () => {
		console.log(this.state.refresh);
		this.setState({ refresh: !this.state.refresh });
		this.props.tasks = this.props.tasks[0];
	};

	render() {
		return (
			<div style={{ border: "1px solid steelblue" }}>
				<strong>{this.props.cat.title}</strong>
				{this.showTasks(this.props.tasks.filter((x) => x.cat_id == this.props.cat.id))}

				<sub>new task:</sub>
				<NewTask cat_id={this.props.cat.id} handler={this.handler} />
				<button onClick={this.handler}>click</button>
			</div>
		);
	}
}

export default Card;
