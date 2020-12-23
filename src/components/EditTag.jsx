import "../App.css";
import PostService from "../services/PostService";
import React, { useEffect, useState } from "react";

function EditTag(props) {
	const isTagged = () => {
		return props.cat.tags && props.cat.tags.filter((tag) => tag.tag_id === parseInt(props.id)).length > 0;
	};

	const [checked, setChecked] = useState(isTagged());

	const changeTags = () => {
		if (checked) {
			setChecked(!checked);
			PostService.deleteItemTag({ tag_id: props.id, cat_id: props.cat.id }).catch((err) => console.log(err));
		} else {
			setChecked(!checked);
			PostService.addItemTag({ tag_id: props.id, cat_id: props.cat.id }).catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		setChecked(isTagged());
	}, [props.cat]);

	return (
		<div className="form-check">
			<input type="checkbox" class="form-check-input" id={props.id} checked={checked} onClick={changeTags} />
			<label class="form-check-label" htmlFor={props.id}>
				{props.title}
			</label>
		</div>
	);
}
export default EditTag;
