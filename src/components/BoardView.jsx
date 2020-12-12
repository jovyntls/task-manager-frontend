import "../App.css";
import PostService from "../services/PostService";
import React, { useState, useEffect } from "react";
import Card from "./Card";

function BoardView() {
	const [cats, setCats] = useState([]);
	const fetchCards = () => {
		PostService.fetchCats()
			.then((response) => {
				setCats(response.data);
			})
			.catch((err) => console.log(err));
	};
	const isValidArray = (data) => {
		return Array.isArray(data) && data.length !== 0;
	};
	const showCards = () => {
		return isValidArray(cats) ? cats.map((cat) => <Card key={cat.id} cat={cat} />) : "";
	};
	useEffect(() => {
		fetchCards();
	}, []);

	return (
		<div>
			<div>HELLO BOARD VIEW</div>
			{showCards()}
		</div>
	);
}

export default BoardView;
