import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/card.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTag } from "./tags-modal-reducer";
import EditTag from "./edit-tag/edit-tag-component";

function TagsModal({ tags, fetchTags, cat }) {
	const dispatch = useDispatch();
	const [newTag, setNewTag] = useState("");

	const handleChange = (event) => {
		setNewTag(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitNewTag();
			setNewTag("");
		}
	};

	const submitNewTag = () => {
		dispatch(addNewTag(newTag));
	};

	useEffect(() => {
		fetchTags();
	}, []);

	return (
		<div className="modal-content">
			<div className="modal-header">
				<h4 className="modal-title" id="exampleModalLabel">
					{cat.title}
				</h4>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div className="modal-body">
				{/* {JSON.stringify(tags)} */}
				{Object.keys(tags).map((item, i) => (
					<EditTag cat={cat} title={tags[item]} id={item} key={i} />
				))}
				<em>Create a new tag:</em>
				<input
					className="flex-grow-1 ml-1"
					type="text"
					placeholder="Your tag"
					value={newTag}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				></input>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-dismiss="modal">
					{/* <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.refresher}> */}
					Close
				</button>
			</div>
		</div>
	);
}

export default TagsModal;
