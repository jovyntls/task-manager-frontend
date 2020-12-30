import "src/App.css";
import React, { useState, useEffect } from "react";
import StackGrid from "react-stack-grid";
import { SizeMe } from "react-sizeme";
import { CardContainer } from "./card/card-container";
import { TagsModalContainer } from "src/components/tags-modal/tags-modal-container";
import { useDispatch } from "react-redux";
import { fetchCats, addNewCat } from "./board-reducer";

function BoardView({ cats, tags }) {
	const dispatch = useDispatch();

	const [edit_tags_active_cat, setEditTagsActiveCat] = useState({}); // change to the whole cat
	const [board_refresh, setBoardRefresh] = useState(0);
	const [waterfall, setWaterfall] = useState([]);

	const isValidArray = (data) => {
		return Array.isArray(data) && data.length !== 0;
	};

	const refreshBoard = () => {
		setBoardRefresh((board_refresh) => board_refresh + 1);
		dispatch(fetchCats());
	};
	const refreshLayout = () => {
		waterfall[0].updateLayout();
	};

	const editTags = (cat) => {
		setEditTagsActiveCat(cat);
	};

	const showCards = () => {
		cats.forEach((cat) => (cat.tags = []));
		tags.forEach((relation) => cats.find((cat) => cat.id === relation.cat_id).tags.push(relation.tag_id));
		return isValidArray(cats)
			? cats.map((cat) => (
					<CardContainer key={cat.id} cat={cat} editTags={editTags} refreshLayout={refreshLayout} refreshTags={board_refresh} />
			  ))
			: "";
	};

	const newCard = () => {
		dispatch(addNewCat({ title: "" }));
	};

	useEffect(() => {
		dispatch(fetchCats());
	}, [board_refresh]);

	return (
		<SizeMe>
			{({ size }) => (
				<div className="content">
					<StackGrid
						gridRef={(grid) => setWaterfall([grid])}
						columnWidth={size.width <= 930 ? (size.width <= 620 ? "100%" : "50%") : "33.33%"}
						gutterWidth={10}
						gutterHeight={10}
					>
						{showCards()}
						<button className="new-card" onClick={newCard}>
							<i className="material-icons align-middle new-card__icon">add_circle_outline</i>
						</button>
					</StackGrid>
					<div
						className="modal fade edit-tags-modal"
						id="edit-tags-modal"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<TagsModalContainer cat={edit_tags_active_cat} />
						</div>
					</div>
				</div>
			)}
		</SizeMe>
	);
}

export default BoardView;
