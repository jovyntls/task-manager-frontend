import "./App.css";
import { removeUserSession } from "./Utils/Common";

function App(props) {
	const subject = props.subject;

	const logout = () => removeUserSession();

	return (
		<div className="App">
			<div style={{ "background-color": "powderblue" }}>
				<button onClick={logout()}>sign out</button>
			</div>
			<header className="App-header">
				<p>Hello {subject}!</p>
			</header>
		</div>
	);
}

export default App;
