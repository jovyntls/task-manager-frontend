import "../App.css";
import React from "react";
import Task from "./Task";

class Card extends React.Component {
	constructor(props) {
        super(props);
	}
    
	isValidArray(data) {
		return !Array.isArray(data) || !data.length;
	}
	showTasks(data) {
		return this.isValidArray(data) ? "" : data.map((item, i) => <Task data={item} key={i}/>);
    }

	render() {
		return (
            <div style={{"border": "1px solid steelblue"}}>
				<strong>{this.props.cat.title}</strong>
				{this.showTasks(this.props.tasks)}
			</div>
		);
	}
}

export default Card;
