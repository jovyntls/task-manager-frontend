import "src/App.css";
import React, { useState, useEffect } from "react";
import StackGrid from "react-stack-grid";
import { SizeMe } from "react-sizeme";
import { CardContainer } from "./card/card-container";
import { TagsModalContainer } from "src/components/tags-modal/tags-modal-container";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats, addNewCat } from "./board-reducer";
import RefreshWaterfall from "./layout-refresher/waterfall-refresh-component";

function BoardView({ cats }) {
	const dispatch = useDispatch();
	const item_tags = useSelector((state) => state.tagsModalReducer.item_tags);
	const selected_tags = useSelector((state) => state.tagsModalReducer.selected);

	const [edit_tags_active_cat, setEditTagsActiveCat] = useState({}); // change to the whole cat
	const [board_refresh, setBoardRefresh] = useState(0);
	const [waterfall, setWaterfall] = useState([]);

	const isValidArray = (data) => {
		return Array.isArray(data) && data.length !== 0;
	};

	const refreshLayout = () => {
		waterfall[0].updateLayout();
	};

	const editTags = (cat) => {
		setEditTagsActiveCat(cat);
	};

	const is_filteredByTags = (cat) => {
		return selected_tags.length === 0
			? true
			: cat.tags.length === 0
			? selected_tags.includes(-1)
			: cat.tags.filter((tag) => selected_tags.includes(tag)).length !== 0;
	};

	const showCards = () => {
		cats.forEach((cat) => (cat.tags = []));
		item_tags.forEach((relation) => cats.find((cat) => cat.id === relation.cat_id).tags.push(relation.tag_id));
		cats = cats.filter(is_filteredByTags);
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
					<RefreshWaterfall refresher={refreshLayout} waterfall={waterfall} />
				</div>
			)}
		</SizeMe>
	);
}

export default BoardView;
