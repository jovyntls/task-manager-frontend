import PostService from "src/services/PostService";

export default function boardReducer(cats = [], action) {
	switch (action.type) {
		case "cats/get": {
			cats = action.payload;
			return [...cats] ?? [];
		}
		case "cats/post": {
			cats.push(action.payload);
			console.log(cats);
			const cat2 = [...cats];
			return cat2;
		}
		case "cats/delete": {
			delete cats[action.payload.id];
			return [...cats];
		}
		default:
			return cats;
	}
}

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
			.then((res) => {
				dispatch({ type: "cats/delete", payload: { id } });
			})
			.catch((err) => console.log(err));
	};
}
