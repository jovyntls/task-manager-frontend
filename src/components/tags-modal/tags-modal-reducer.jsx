import PostService from "../../services/PostService";

export default function tagsModalReducer(tags = [], action) {
	switch (action.type) {
		case "FETCH_TAGS": {
			console.log("returned action payload: ", action.payload);
			console.log("action: ", action);
			return action.payload ?? [];
		}
		case "tags/post": {
			tags[action.payload.id] = action.payload.title;
			return { ...tags };
		}
		default:
			return tags;
	}
}

export async function fetchTags(dispatch, getState) {
	PostService.fetchTags()
		.then((response) => {
			const fetched_tags = {};
			response.data.forEach((item) => (fetched_tags[item.id] = item.title));
			console.log("tags: ", fetched_tags);
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
				console.log("post tag response: ", res.data);
				dispatch({ type: "tags/post", payload: res.data });
			})
			.catch((err) => console.log(err));
	};
}
