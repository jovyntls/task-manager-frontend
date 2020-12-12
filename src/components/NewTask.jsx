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
			setTitle("");
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
	return (
		<div>
			<input type="checkbox"></input>
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
