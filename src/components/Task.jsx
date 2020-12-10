import "../App.css";
import React from "react";

function Task(props) {
	return <li>{props.data.title}</li>;
}

export default Task;
