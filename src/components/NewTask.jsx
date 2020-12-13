import "../App.css";
import React, { useState } from "react";
import PostService from "../services/PostService";
import "./stylesheets/task.scss";

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

	// css class helpers
	const priorityClass = (prefix) => {
		const priority_map = ["low", "med", "high"];
		return prefix + " " + prefix + "--" + priority_map[priority];
	};

	return (
		<div className="d-flex">
			<button className="task__checkbox" disabled>
				<i className="material-icons align-middle">create</i>
			</button>
			<button className={priorityClass("task__priority")} onClick={editPriority} disabled={title === ""}></button>
			<input
				className="task__title flex-grow-1"
				type="text"
				value={title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder="Add task"
			></input>
		</div>
	);
}
export default NewTask;
