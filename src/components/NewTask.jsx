import "../App.css";
import React, { useState } from "react";
import PostService from "../services/PostService";

function NewTask(props) {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState(0);

	const handleChange = (event) => {
		setTitle(event.target.value);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitEdit();
			setTitle("");
			setPriority(0);
			props.refresher();
		}
	};
	const submitEdit = () => {
		console.log("saved: ", title);
		PostService.addNewTask({ cat_id: props.cat_id, title: title, priority: priority })
			.then((response) => {
				return response;
			})
			.catch((err) => console.log(err));
	};
	const editPriority = () => {
		setPriority((priority) => (priority + 1) % 3);
	};

	return (
		<div>
			<input type="checkbox"></input>
			<button onClick={editPriority}>{priority}</button>
			<input
				type="text"
				className="form-control-plaintext"
				value={title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			></input>
		</div>
	);
}
export default NewTask;
