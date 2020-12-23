import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import StackGrid from "react-stack-grid";
import EditTagsModal from "./EditTagsModal";

function BoardView() {
	const [cats, setCats] = useState([]);
	const [tags, setTags] = useState({});
	const [edit_tags_active_cat, setEditTagsActiveCat] = useState({}); // change to the whole cat
	const [tag_relations, setTagRelations] = useState([]);
	const [board_refresh, setBoardRefresh] = useState(false);
	const [waterfall, setWaterfall] = useState([]);
	const [layout_refresh, setLayoutRefresh] = useState(0);

	const isValidArray = (data) => {
		return Array.isArray(data) && data.length !== 0;
	};

	const refreshBoard = () => {
		setBoardRefresh(!board_refresh);
		fetchCards();
	};
	const refreshLayout = () => {
		waterfall[0].updateLayout();
	};

	// API calls for tags
	const fetchTags = () => {
		PostService.fetchTags()
			.then((response) => {
				const tags = {};
				response.data.forEach((item) => (tags[item.id] = item.title));
				setTags(tags);
			})
			.catch((err) => console.log(err));
	};
	const editTags = (cat) => {
		setEditTagsActiveCat(cat);
	};
	// API calls for editing categories
	const fetchCards = () => {
		PostService.fetchCats()
			.then((response) => {
				setCats(response.data);
			})
			.then(setLayoutRefresh(layout_refresh + 1))
			.catch((err) => console.log(err));
	};
	const showCards = () => {
		return isValidArray(cats)
			? cats.map((cat) => (
					<Card key={cat.id} cat={cat} tags={tags} editTags={editTags} refresher={refreshBoard} refreshLayout={refreshLayout} />
			  ))
			: "";
	};
	const newCard = () => {
		PostService.addNewCard({ title: "" });
		refreshBoard();
	};

	useEffect(() => {
		fetchTags();
		fetchCards();
	}, [board_refresh]);

	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div>HELLO BOARD VIEW</div>
			<StackGrid
				gridRef={(grid) => {
					setWaterfall([grid]);
				}}
				columnWidth="33.33%"
				gutterWidth={10}
				gutterHeight={10}
			>
				{showCards()}
				<button className="new-card" onClick={newCard}>
					<i className="material-icons align-middle new-card__icon">add_circle_outline</i>
				</button>
			</StackGrid>
			<div
				class="modal fade edit-tags-modal"
				id="edit-tags-modal"
				tabindex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog" role="document">
					<EditTagsModal cat={edit_tags_active_cat} tags={tags} />
				</div>
			</div>
		</div>
	);
}

export default BoardView;
