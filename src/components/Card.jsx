import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import NewTask from "./NewTask";

function Card(props) {
	const [refresh, setRefresh] = useState(false);
	const [tasks, setTasks] = useState([]);

	const isValidArray = (data) => {
		return !Array.isArray(data) || !data.length;
	};
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

	useEffect(() => {
		getTasks();
	}, [refresh]);

	return (
		<div style={{ border: "1px solid steelblue" }}>
			<strong>{props.cat.title}</strong>
			{showTasks(tasks)}

			<sub>new task:</sub>
			<NewTask cat_id={props.cat.id} refresher={refreshTasks} />
		</div>
	);
}

export default Card;
