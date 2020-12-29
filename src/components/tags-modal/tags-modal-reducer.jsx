import PostService from "../../services/PostService";

export default function tagsModalReducer(tags = [], action) {
	switch (action.type) {
		case "FETCH_TAGS": {
			tags = action.payload;
			return { ...tags } ?? [];
		}
		case "tags/post": {
			tags[action.payload.id] = action.payload.title;
			return { ...tags };
		}
		case "tags/delete": {
			delete tags[action.payload.id];
			return { ...tags };
		}
		default:
			return tags;
	}
}

export async function fetchTags(dispatch, getState) {
	console.log("state: ", getState());
	PostService.fetchTags()
		.then((response) => {
			const fetched_tags = {};
			response.data.forEach((item) => (fetched_tags[item.id] = item.title));
			return fetched_tags;
		})
		.then((fetched_tags) => {
			dispatch({ type: "FETCH_TAGS", payload: fetched_tags });
		})
		.catch((err) => console.log(err));
}

export function addNewTag(title) {
	return async function addNewTagThunk(dispatch, getState) {
		PostService.addNewTag({ title: title })
			.then((res) => {
				dispatch({ type: "tags/post", payload: res.data });
			})
			.catch((err) => console.log(err));
	};
}

export function deleteTag(id) {
	return async function deleteTagThunk(dispatch, getState) {
		PostService.deleteTag(id)
			.then((res) => {
				dispatch({ type: "tags/delete", payload: { id } });
			})
			.catch((err) => console.log(err));
	};
}

export function deleteItemTag(params) {
	return async function deleteItemTagThunk(dispatch, getState) {
		PostService.deleteItemTag(params)
			.then((res) => {
				return res;
			})
			.catch((err) => console.log(err));
	};
}
export function addItemTag(params) {
	return async function deleteItemTagThunk(dispatch, getState) {
		PostService.deleteItemTag(params)
			.then((res) => {
				return res;
			})
			.catch((err) => console.log(err));
	};
}
