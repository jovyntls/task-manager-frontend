import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Card from "./Card";
import StackGrid from "react-stack-grid";

function BoardView() {
	const [cats, setCats] = useState([]);
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
			? cats.map((cat) => <Card key={cat.id} cat={cat} refresher={refreshBoard} refreshLayout={upup} />)
			: "";
	};
	const newCard = () => {
		PostService.addNewCard({ title: "test card" });
		refreshBoard();
	};

	const upup = () => {
		waterfall[0].updateLayout();
	};

	useEffect(() => {
		fetchCards();
	}, [board_refresh]);
	useLayoutEffect(() => {
		const nf = () => null;
		console.log("layoutrefresh:", layout_refresh);
		console.log(waterfall);
	}, [waterfall]);

	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div>HELLO BOARD VIEW</div>
			{/* <div className="row p-3">
				{showCards()}
				<button onClick={newCard}>new category</button>
			</div> */}
			<StackGrid
				gridRef={(grid) => {
					setWaterfall([grid]);
				}}
				columnWidth="33.33%"
				gutterWidth={20}
			>
				{showCards()}
				<button onClick={newCard}>new category</button>
				<button onClick={upup}>clicksdj</button>
			</StackGrid>
		</div>
	);
}

export default BoardView;
