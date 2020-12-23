import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/card.scss";
import EditTag from "./EditTag";
import PostService from "../services/PostService";
import React, { useEffect, useState } from "react";

function EditTagsModal(props) {
	const [newTag, setNewTag] = useState("");
	const [tags, setTags] = useState(props.tags);

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
		PostService.addNewTag({ title: newTag })
			.then((response) => {
				props.refreshTags();
				return response;
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		setTags(props.tags);
	}, [props.tags]);

	return (
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="exampleModalLabel">
					{props.cat.title}
				</h4>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				{Object.keys(tags).map((item, i) => (
					<EditTag all_tags={tags} cat={props.cat} title={tags[item]} id={item} key={i} refresher={props.refreshTags} />
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
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={props.refresher}>
					Close
				</button>
			</div>
		</div>
	);
}

export default EditTagsModal;
