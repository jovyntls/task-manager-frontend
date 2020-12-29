export const tagReducer = function (tags = [], action) {
	switch (action.type) {
		case "ADD_TAG":
			tags.push("x");
			return [...tags];
		case "REMOVE_TAG":
			tags.pop();
			return [...tags];
		default:
			return tags;
	}
};
