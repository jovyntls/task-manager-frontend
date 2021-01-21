import "src/App.css";
import React, { useState } from "react";
import Task from "./task/task-component";
import NewTask from "./task/NewTask";
import Tag from "./Tag";
import "bootstrap/dist/css/bootstrap.min.css";
import "src/components/stylesheets/card.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteCat, editCat } from "src/reducers/board-reducer";

function Card({ cat, tags, editTags }) {
	const dispatch = useDispatch();
	const sort_option = useSelector((state) => state.viewOptionsReducer);

	const tasks =
		useSelector((state) => {
			const this_cat = state.boardReducer.find((item) => item.id === cat.id);
			return this_cat == undefined ? [] : this_cat.tasks;
		}) ?? [];

	const [title, setTitle] = useState(cat.title);

	const showTags = () => {
		return cat.tags.map((tag_id) => <Tag key={tag_id} title={tags[tag_id]} />);
	};
	const submitEditTags = () => {
		editTags(cat);
	};

	const showTasks = () => {
		let data = tasks.sort((a, b) => (a[sort_option.sort] > b[sort_option.sort] ? 1 : -1));
		data = sort_option.ascending ? data : data.reverse();
		return data.map((item, i) => <Task data={item} key={item.id} />);
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
					aria-label={cat.title}
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
			{showTasks()}

			<NewTask cat_id={cat.id} />
		</div>
	);
}

export default Card;
