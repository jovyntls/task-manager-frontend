import "../App.css";
import React, { useEffect, useState } from "react";
import PostService from "../services/PostService";
import "./stylesheets/task.scss";

function Task(props) {
	const [title, setTitle] = useState(props.data.title);
	const [completed, setCompleted] = useState(props.data.completed);
	const [priority, setPriority] = useState(props.data.priority);

	// handlers
	const handleChange = (event) => {
		setTitle(event.target.value);
		resizeTextarea();
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitEdit();
			document.getElementById("task-title-" + props.data.id).blur();
		}
	};

	// css class helpers
	const priorityClass = (prefix) => {
		const priority_map = ["low", "med", "high"];
		return completed ? prefix : prefix + " " + prefix + "--" + priority_map[priority];
	};
	const resizeTextarea = () => {
		const elem = document.getElementById("task-title-" + props.data.id);
		const h = elem.scrollHeight;
		elem.style.height = h + "px";
	};

	// API calls
	const submitEdit = () => {
		console.log("saved: ", title);
		PostService.editTask({ id: props.data.id, title: title }).catch((err) => console.log(err));
	};

	const submitCompleted = () => {
		PostService.editTask({ id: props.data.id, completed: !completed }).catch((err) => console.log(err));
		setCompleted((completed) => !completed);
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

	useEffect(() => {
		resizeTextarea();
	}, []);

	return (
		<div className="task__row d-flex">
			<button className={priorityClass("task__checkbox")} onClick={submitCompleted} disabled={completed}>
				<i className="material-icons align-middle">{completed ? "check_circle" : "radio_button_unchecked"}</i>
			</button>
			<button className={priorityClass("task__priority")} onClick={submitPriority} disabled={completed}></button>
			<textarea
				rows="1"
				className="task__title flex-grow-1"
				id={"task-title-" + props.data.id}
				type="text"
				defaultValue={props.data.title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={submitEdit}
			></textarea>
			<button className="task__delete" onClick={submitDelete}>
				<i className="material-icons align-middle">clear</i>
			</button>
		</div>
	);
}
export default Task;
