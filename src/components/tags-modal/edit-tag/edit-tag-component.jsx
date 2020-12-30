import "src/App.css";
import "src/components/stylesheets/taglist.scss";
import React, { useEffect, useState } from "react";
import { deleteTag, deleteItemTag, addItemTag } from "../tags-modal-reducer";
import { useDispatch } from "react-redux";

function EditTag({ cat, title, id }) {
	const dispatch = useDispatch();

	const isTagged = () => {
		return Boolean(cat.tags) && cat.tags.includes(id);
	};

	const [checked, setChecked] = useState(isTagged());

	const changeTags = () => {
		if (checked) {
			setChecked(!checked);
			dispatch(deleteItemTag({ tag_id: id, cat_id: cat.id }));
		} else {
			setChecked(!checked);
			dispatch(addItemTag({ tag_id: id, cat_id: cat.id }));
		}
	};

	const submitDeleteTag = () => {
		dispatch(deleteTag(id));
	};

	useEffect(() => {
		setChecked(isTagged());
	}, [cat]);

	return (
		<div className="d-flex">
			<button className="tag__delete tag__icon-button" onClick={submitDeleteTag}>
				<i className="material-icons tag__icon align-middle">clear</i>
			</button>
			{/* <button className="tag__edit tag__icon-button" onClick={submitEditTag}>
				<i className="material-icons tag__icon align-middle">edit</i>
			</button> */}
			<span className="form-check ml-1">
				<input type="checkbox" className="form-check-input" id={id} checked={checked} onChange={changeTags} />
				<label className="form-check-label" htmlFor={id}>
					{title}
				</label>
			</span>
		</div>
	);
}
export default EditTag;
