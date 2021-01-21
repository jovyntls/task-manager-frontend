import PostService from "src/services/PostService";

export default function boardReducer(cats = [], action) {
	switch (action.type) {
		case "cats/get": {
			return action.payload ?? [];
		}
		case "cats/post": {
			action.payload.tasks = []; // prevents error of tasks undefined
			cats.push(action.payload);
			return [...cats];
		}
		case "cats/delete": {
			console.log(action.payload);
			return cats.filter((cat) => cat.id !== action.payload.id);
		}
		case "tasks/get": {
			cats.forEach((cat) => (cat.tasks = action.payload.filter((task) => task.cat_id === cat.id)));
			return cats;
		}
		case "tasks/post": {
			const cat_to_update = cats.find((cat) => cat.id === action.payload.cat_id);
			cat_to_update.tasks = [...cat_to_update.tasks, action.payload];
			return cats;
		}
		case "tasks/delete": {
			const cat_to_update = cats.find((cat) => cat.id === action.payload.cat_id);
			cat_to_update.tasks = cat_to_update.tasks.filter((task) => task.id !== action.payload.id);
			return cats;
		}
		default:
			return cats;
	}
}

// CRUD for Categories
export function fetchCats() {
	return async function fetchCatsThunk(dispatch, getState) {
		PostService.fetchCats()
			.then((res) => {
				dispatch({ type: "cats/get", payload: res.data });
				PostService.fetchTasks()
					.then((res) => {
						dispatch({ type: "tasks/get", payload: res.data });
						dispatch({ type: "refresh_layout" });
					})
					.catch((err) => console.log(err));
			})
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
export function fetchTasks() {
	return async function fetchTasksThunk(dispatch, getState) {
		PostService.fetchTasks()
			.then((res) => dispatch({ type: "tasks/get", payload: res.data }))
			.catch((err) => console.log(err));
	};
}

export function addNewTask(params) {
	return async function addNewTaskThunk(dispatch, getState) {
		PostService.addNewTask(params)
			.then((res) => dispatch({ type: "tasks/post", payload: res.data }))
			.then((res) => dispatch({ type: "refresh_layout" }))
			.catch((err) => console.log(err));
	};
}

export function editTask(params) {
	return async function editTaskThunk(dispatch, getState) {
		PostService.editTask(params).catch((err) => console.log(err));
	};
}

export function deleteTask(params) {
	return async function deleteTaskThunk(dispatch, getState) {
		PostService.deleteTask(params.id)
			.then((res) => dispatch({ type: "tasks/delete", payload: { id: params.id, cat_id: params.cat_id } }))
			.then((res) => dispatch({ type: "refresh_layout" }))
			.catch((err) => console.log(err));
	};
}
