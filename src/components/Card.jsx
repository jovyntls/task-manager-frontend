import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import NewTask from "./NewTask";

function Card(props) {
	const [refresh, setRefresh] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState(props.cat.title);

	const isValidArray = (data) => {
		return !Array.isArray(data) || !data.length;
	};

	// API calls for editing tasks
	const getTasks = () => {
		PostService.fetchTasksFromCat(props.cat.id)
			.then((res) => {
				setTasks(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const showTasks = (data) => {
		return isValidArray(data) ? "" : data.map((item, i) => <Task data={item} key={i} refresher={refreshTasks} />);
	};
	const refreshTasks = () => {
		setRefresh(!refresh);
		getTasks();
	};

	// for editing categories
	const handleChange = (event) => {
		setTitle(event.target.value);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitEdit();
		}
	};
	// API calls
	const submitEdit = () => {
		console.log("saved: ", title);
		PostService.editCard({ id: props.cat.id, title: title }).catch((err) => console.log(err));
	};
	const deleteCard = () => {
		PostService.deleteCard(props.cat.id)
			.then(() => props.refresher())
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getTasks();
	}, [refresh]);

	return (
		<div style={{ border: "1px solid steelblue" }}>
			<strong>{props.cat.title}</strong>
			<input
				type="text"
				className="form-control-plaintext"
				defaultValue={props.cat.title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onBlur={submitEdit}
			></input>
			<button onClick={deleteCard}>x</button>
			{showTasks(tasks)}

			<sub>new task:</sub>
			<NewTask cat_id={props.cat.id} refresher={refreshTasks} />
		</div>
	);
}

export default Card;
