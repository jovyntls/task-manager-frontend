import PostService from "src/services/PostService";

export default function tagsModalReducer(tags = { names: {}, item_tags: [] }, action) {
	switch (action.type) {
		case "FETCH_TAGS": {
			tags.names = action.payload;
			return { ...tags } ?? tags;
		}
		case "item_tags/get": {
			tags.item_tags = action.payload;
			console.log(tags);
			return { ...tags } ?? tags;
		}
		case "tags/post": {
			tags.names[action.payload.id] = action.payload.title;
			return { ...tags };
		}
		case "tags/delete": {
			delete tags.names[action.payload.id];
			return { ...tags };
		}
		default:
			return tags;
	}
}

export function fetchTags() {
	return async function fetchTagsThunk(dispatch, getState) {
		PostService.fetchTags()
			.then((response) => {
				const fetched_tags = {};
				response.data.forEach((item) => (fetched_tags[item.id] = item.title));
				return fetched_tags;
			})
			.then((res) => {
				dispatch({ type: "FETCH_TAGS", payload: res });
			})
			.then((res) => fetchItemTags())
			.catch((err) => console.log(err));
		PostService.fetchItemTags()
			.then((response) => {
				return response.data.map((item) => ({ cat_id: item.cat_id, tag_id: item.tag_id }));
			})
			.then((res) => {
				dispatch({ type: "item_tags/get", payload: res });
			})
			.catch((err) => console.log(err));
	};
}

export function fetchItemTags() {
	return async function fetchItemTagsThunk(dispatch, getState) {
		PostService.fetchItemTags()
			.then((response) => {
				return response.data;
			})
			.then((res) => {
				dispatch({ type: "item_tags/get", payload: res });
			})
			.catch((err) => console.log(err));
	};
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
	return async function addItemTagThunk(dispatch, getState) {
		PostService.addItemTag(params)
			.then((res) => {
				return res;
			})
			.catch((err) => console.log(err));
	};
}
