import "../App.css";
import PostService from "../services/PostService";

function BoardView() {
	PostService.fetchTasks()
		.then((response) => {
			console.log(response);
		})
		.catch((err) => console.log(err));
	return <div>HELLO this is the board view</div>;
}

export default BoardView;
