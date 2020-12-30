import "src/App.css";
import PostService from "src/services/PostService";
import React, { useState, useEffect } from "react";
import Task from "./task/task-component";
import NewTask from "./task/NewTask";
import Tag from "./Tag";
import "bootstrap/dist/css/bootstrap.min.css";
import "src/components/stylesheets/card.scss";
import { useDispatch } from "react-redux";
import { deleteCat, editCat } from "../board-reducer";

function Card({ cat, tags, editTags, refreshLayout, refreshTags }) {
	const dispatch = useDispatch();

	const [refresh, setRefresh] = useState(refreshTags);
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState(cat.title);

	const isValidArray = (data) => {
		return !Array.isArray(data) || !data.length;
	};

	const showTags = () => {
		return cat.tags.map((tag_id) => <Tag title={tags[tag_id]} />);
	};
	const submitEditTags = () => {
		editTags(cat);
	};

	// API calls for editing tasks
	const getTasks = () => {
		PostService.fetchTasksFromCat(cat.id)
			.then((res) => {
				setTasks(res.data);
				refreshLayout();
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
		dispatch(editCat({ id: cat.id, title: title }));
	};
	const deleteCard = () => {
		dispatch(deleteCat(cat.id));
	};

	useEffect(() => {
		getTasks();
	}, [refreshTags, refresh]);

	return (
		<div className="card my-card p-3">
			<div className="d-flex">
				<input
					className="card__title flex-grow-1"
					type="text"
					defaultValue={cat.title}
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

			<NewTask cat_id={cat.id} refresher={refreshTasks} />
		</div>
	);
}

export default Card;
