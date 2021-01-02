import "src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "src/components/stylesheets/card.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTag, fetchTags } from "./tags-modal-reducer";
import EditTag from "./edit-tag/edit-tag-component";

function TagsModal({ tags, cat }) {
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
		dispatch(fetchTags());
	}, []);

	return (
		<div
			className="modal fade edit-tags-modal"
			id="edit-tags-modal"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="editTagsModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title" id="editTagsModalLabel">
							{cat.title}
						</h4>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{Object.keys(tags.names).map((item, i) => (
							<EditTag cat={cat} title={tags.names[item]} id={parseInt(item)} key={i} />
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
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TagsModal;
