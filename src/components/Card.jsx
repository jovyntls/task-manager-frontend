import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/card.scss";

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
				props.refreshLayout();
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
		<div className="card my-card p-3">
			<div className="d-flex">
				<input
					className="card__title flex-grow-1"
					type="text"
					defaultValue={props.cat.title}
					placeholder="New Title"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onBlur={submitEdit}
				></input>
				<div className="dropdown">
					<button className="menu__icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<i className="material-icons align-middle">more_horiz</i>
					</button>
					<div className="menu__items dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
						<a className="dropdown-item" href="#" onClick={deleteCard}>
							Delete this card
						</a>
						<a className="dropdown-item" href="#">
							Edit tags
						</a>
						<a className="dropdown-item" href="#">
							Clear completed
						</a>
					</div>
				</div>
			</div>

			{showTasks(tasks)}
			<NewTask cat_id={props.cat.id} refresher={refreshTasks} />
		</div>
	);
}

export default Card;
