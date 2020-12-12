import "../App.css";
import React, { useState } from "react";
import PostService from "../services/PostService";

function NewTask(props) {
	const [title, setTitle] = useState("");
	const handleChange = (event) => {
		setTitle(event.target.value);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitEdit();
			resetInput();
			// setTitle("");
			props.refresher();
		}
	};
	const submitEdit = () => {
		console.log("saved: ", title);
		PostService.addNewTask({ cat_id: props.cat_id, title: title })
			.then((response) => {
				return response;
			})
			.catch((err) => console.log(err));
	};
	const resetInput = () => {
		document.getElementById("new-task-input").value = "";
	};
	return (
		<div>
			<input type="checkbox"></input>
			<input
				type="text"
				id="new-task-input"
				className="form-control-plaintext"
				defaultValue=""
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			></input>
		</div>
	);
}
export default NewTask;
