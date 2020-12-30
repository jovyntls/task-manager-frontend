import "./App.css";
import SideBar from "./components/layout/SideBar";
// import BoardView from "./components/BoardView";
import { BoardContainer } from "./components/board/board-container";

function App(props) {
	return (
		<div className="App">
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div className="wrapper">
				<SideBar />
				<BoardContainer />
			</div>
		</div>
	);
}

export default App;
