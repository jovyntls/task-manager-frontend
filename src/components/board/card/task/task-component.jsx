import "src/App.css";
import React, { useEffect, useState } from "react";
import "src/components/stylesheets/task.scss";
import { useDispatch } from "react-redux";
import { editTask, deleteTask } from "src/reducers/board-reducer";

function Task(props) {
	const dispatch = useDispatch();
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
		return `${prefix} ${prefix}--${completed ? "completed" : priority_map[priority]}`;
	};
	const resizeTextarea = () => {
		const elem = document.getElementById("task-title-" + props.data.id);
		const h = elem.scrollHeight;
		elem.style.height = h + "px";
	};

	// API calls
	const submitEdit = () => {
		dispatch(editTask({ id: props.data.id, title: title }));
	};

	const submitCompleted = () => {
		dispatch(editTask({ id: props.data.id, completed: !completed }));
		setCompleted((completed) => !completed);
	};

	const submitPriority = () => {
		dispatch(editTask({ id: props.data.id, priority: (priority + 1) % 3 }));
		setPriority((priority) => (priority + 1) % 3);
	};

	const submitDelete = () => {
		dispatch(deleteTask({ id: props.data.id, cat_id: props.data.cat_id }));
	};

	useEffect(() => {
		resizeTextarea();
	});

	return (
		<div className="task__row d-flex">
			<button className={priorityClass("task__checkbox")} onClick={submitCompleted}>
				<i className="material-icons align-middle">{completed ? "check_circle" : "radio_button_unchecked"}</i>
			</button>
			<button className={priorityClass("task__priority")} onClick={submitPriority} disabled={completed}></button>
			<textarea
				rows="1"
				className={`flex-grow-1 target-for-hover task__title ${completed ? "task__title--completed" : ""}`}
				id={"task-title-" + props.data.id}
				type="text"
				defaultValue={props.data.title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={submitEdit}
			></textarea>
			<button className="task__delete show-on-hover" onClick={submitDelete}>
				<i className="material-icons align-middle">clear</i>
			</button>
		</div>
	);
}
export default Task;
