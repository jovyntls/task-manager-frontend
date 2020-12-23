import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import Tag from "./Tag";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/card.scss";

function Card(props) {
	const [refresh, setRefresh] = useState(props.refreshTags);
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState(props.cat.title);
	const [tags, setTags] = useState([]);

	const isValidArray = (data) => {
		return !Array.isArray(data) || !data.length;
	};

	// API calls for tags
	const getTags = () => {
		console.log(tags);
		PostService.fetchTagsFromCat({ cat_id: props.cat.id })
			.then((response) => {
				setTags(response.data);
			})
			.catch((err) => console.log(err));
	};
	const showTags = () => {
		return tags.map((item, i) => <Tag title={props.tags[item.tag_id]} key={item.tag_id} />);
	};
	const submitEditTags = () => {
		props.editTags({ ...props.cat, tags: tags });
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
		setRefresh((refresh) => refresh + 1);
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
		PostService.editCard({ id: props.cat.id, title: title }).catch((err) => console.log(err));
	};
	const deleteCard = () => {
		PostService.deleteCard(props.cat.id)
			.then(() => props.refresher())
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getTags();
		getTasks();
	}, [props.refreshTags, refresh]);

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
						<button className="dropdown-item" onClick={deleteCard}>
							Delete this card
						</button>
						<button className="dropdown-item" data-toggle="modal" data-target="#edit-tags-modal" onClick={submitEditTags}>
							Edit tags
						</button>
						<button className="dropdown-item">Clear completed</button>
					</div>
				</div>
			</div>
			<div className="mb-2">{showTags()}</div>
			{showTasks(tasks)}

			<NewTask cat_id={props.cat.id} refresher={refreshTasks} />
		</div>
	);
}

export default Card;
