import "../App.css";
import React, { useEffect, useState } from "react";
import PostService from "../services/PostService";

function Task(props) {
	const [title, setTitle] = useState(props.data.title);
	const [completed, setCompleted] = useState(props.data.completed);
	const [priority, setPriority] = useState(props.data.priority);
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
		PostService.editTask({ id: props.data.id, title: title }).catch((err) => console.log(err));
	};

	const submitCompleted = (event) => {
		setCompleted(event.target.checked);
		PostService.editTask({ id: props.data.id, completed: event.target.checked }).catch((err) => console.log(err));
	};

	const submitPriority = () => {
		PostService.editTask({ id: props.data.id, priority: (priority + 1) % 3 }).catch((err) => console.log(err));
		setPriority((priority) => (priority + 1) % 3);
	};

	const submitDelete = () => {
		PostService.deleteTask(props.data.id)
			.then(() => {
				props.refresher();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<input type="checkbox" checked={completed} onChange={submitCompleted}></input>
			<button onClick={submitPriority}>{priority}</button>
			<input
				type="text"
				className="form-control-plaintext"
				defaultValue={props.data.title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={submitEdit}
			></input>
			<button onClick={submitDelete}>x</button>
		</div>
	);
}
export default Task;
