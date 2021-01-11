export default function viewOptionsReducer(options = { sort: "created_at", order: "ASC" }, action) {
	switch (action.type) {
		case "tasks/sort": {
			return action.payload;
		}
		default:
			return options;
	}
}
