import "../App.css";
import PostService from "../services/PostService";
import React, { useEffect, useState } from "react";

function EditTag(props) {
	const isTagged = () => {
		console.log(props.cat.tags);
		return props.cat.tags && props.cat.tags.filter((tag) => tag.tag_id === parseInt(props.id)).length > 0;
	};

	const [checked, setChecked] = useState(isTagged());
	console.log("checked: ", checked);

	const changeTags = () => {
		const check = !checked;
		if (checked) {
			setChecked(check);
			PostService.deleteItemTag({ tag_id: props.id, cat_id: props.cat.id }).catch((err) => console.log(err));
			console.log(checked);
		} else {
			setChecked(check);
			PostService.addItemTag({ tag_id: props.id, cat_id: props.cat.id }).catch((err) => console.log(err));
			console.log(checked);
		}
	};

	useEffect(() => {
		setChecked(isTagged());
		console.log("here: ", checked);
	}, [checked]);

	return (
		<div className="form-check">
			<input type="checkbox" class="form-check-input" id={props.id} checked={checked} onClick={changeTags} />
			<label class="form-check-label" htmlFor={props.id}>
				{props.title}
			</label>
			checked: {checked}
		</div>
	);
}
export default EditTag;
