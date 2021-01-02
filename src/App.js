import "./App.css";
import { SideBarContainer } from "./components/layout/sidebar-container";
import { BoardContainer } from "./components/board/board-container";

function App(props) {
	return (
		<div className="App">
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div className="wrapper">
				<SideBarContainer />
				<BoardContainer />
			</div>
		</div>
	);
}

export default App;
