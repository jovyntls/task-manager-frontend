import "src/App.css";
import React, { useState } from "react";
import "src/components/stylesheets/task.scss";
import "src/App.css";
import { useDispatch } from "react-redux";
import { addNewTask } from "src/reducers/board-reducer";

function NewTask(props) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState(0);
	const priority_map = ["low", "med", "high"];

	const handleChange = (event) => {
		setTitle(event.target.value);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitEdit();
			setTitle("");
			setPriority(0);
		}
	};
	const submitEdit = () => dispatch(addNewTask({ cat_id: props.cat_id, title: title, priority: priority }));
	const editPriority = () => setPriority((priority) => (priority + 1) % 3);

	// css class helpers
	const priorityClass = (prefix) => prefix + " " + prefix + "--" + priority_map[priority];

	return (
		<div className="d-flex">
			<button className="task__checkbox" disabled>
				<i className="material-icons align-middle">create</i>
			</button>
			<button
				className={priorityClass("task__priority")}
				onClick={editPriority}
				disabled={title === ""}
				aria-label="toggle priority"
			></button>
			<input
				className="task__title flex-grow-1"
				type="text"
				value={title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder="Add task"
				aria-label="Add task"
			></input>
		</div>
	);
}
export default NewTask;
