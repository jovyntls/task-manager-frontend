import "./App.css";
import SideBar from "./components/layout/SideBar";
import BoardView from "./components/BoardView";

function App(props) {
	return (
		<div className="App">
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div className="wrapper">
				<SideBar />
				<BoardView />
			</div>
		</div>
	);
}

export default App;
