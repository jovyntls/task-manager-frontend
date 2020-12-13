import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Card from "./Card";

function BoardView() {
	const [cats, setCats] = useState([]);
	const [board_refresh, setBoardRefresh] = useState(false);

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
			.catch((err) => console.log(err));
	};
	const showCards = () => {
		return isValidArray(cats) ? cats.map((cat) => <Card key={cat.id} cat={cat} refresher={refreshBoard} />) : "";
	};
	const newCard = () => {
		PostService.addNewCard({ title: "test card" });
		refreshBoard();
	};

	useEffect(() => {
		fetchCards();
	}, [board_refresh]);

	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div>HELLO BOARD VIEW</div>
			<div className="row p-3">
				{showCards()}
				<button onClick={newCard}>new category</button>
			</div>
		</div>
	);
}

export default BoardView;
