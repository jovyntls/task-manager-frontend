import PostService from "src/services/PostService";

export default function boardReducer(cats = [], action) {
	switch (action.type) {
		case "cats/get": {
			cats = action.payload;
			return [...cats] ?? [];
		}
		case "cats/post": {
			cats.push(action.payload);
			return [...cats];
		}
		case "cats/delete": {
			return cats.filter((cat) => cat.id !== action.payload.id);
		}
		default:
			return cats;
	}
}

// CRUD for Categories
export function fetchCats() {
	return async function fetchCatsThunk(dispatch, getState) {
		PostService.fetchCats()
			.then((response) => response.data)
			.then((res) => dispatch({ type: "cats/get", payload: res }))
			.catch((err) => console.log(err));
	};
}

export function addNewCat(params) {
	return async function addNewCatThunk(dispatch, getState) {
		PostService.addNewCat(params)
			.then((res) => dispatch({ type: "cats/post", payload: res.data }))
			.catch((err) => console.log(err));
	};
}

export function deleteCat(id) {
	return async function deleteCatThunk(dispatch, getState) {
		PostService.deleteCat(id)
			.then((res) => dispatch({ type: "cats/delete", payload: { id } }))
			.catch((err) => console.log(err));
	};
}

export function editCat(params) {
	return async function editCatThunk(dispatch, getState) {
		PostService.editCat(params).catch((err) => console.log(err));
	};
}

// CRUD for Tasks
export function addNewTask(params) {
	return async function addNewTaskThunk(dispatch, getState) {
		PostService.addNewTask(params)
			.then((res) => dispatch({ type: "tasks/post", payload: res.data }))
			.catch((err) => console.log(err));
	};
}

export function editTask(params) {
	return async function editTaskThunk(dispatch, getState) {
		PostService.editTask(params).catch((err) => console.log(err));
	};
}

export function deleteTask(id) {
	return async function deleteTaskThunk(dispatch, getState) {
		PostService.deleteTask(id)
			.then((res) => dispatch({ type: "tasks/delete", payload: { id } }))
			.catch((err) => console.log(err));
	};
}
