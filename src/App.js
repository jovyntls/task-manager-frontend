import "./App.css";

function App(props) {
	const subject = props.subject;

	return (
		<div className="App">
			sign out
			<header className="App-header">
				<p>Hello {subject}!</p>
			</header>
		</div>
	);
}

export default App;
