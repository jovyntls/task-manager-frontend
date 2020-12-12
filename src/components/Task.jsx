import "../App.css";
import React, { useState } from "react";
import PostService from "../services/PostService";

function Task(props) {
	const [title, setTitle] = useState(props.data.title);
	const handleChange = (event) => {
		setTitle(event.target.value);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitEdit();
		}
	};
	const submitEdit = () => {
		console.log("saved: ", title);
		PostService.editTaskTitle({ id: props.data.id, title: title })
			.then((response) => {
				return response;
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<input type="checkbox"></input>
			<input
				type="text"
				className="form-control-plaintext"
				defaultValue={props.data.title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={submitEdit}
			></input>
		</div>
	);
}
export default Task;
