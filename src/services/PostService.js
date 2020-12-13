import Api from "./Api";

export default {
	// TASKS
	fetchTasks() {
		return Api().get("tasks");
	},
	fetchTasksFromCat(cat_id) {
		return Api().get("tasks/cat/" + cat_id);
	},
	editTask(params) {
		return Api().put("tasks/" + params.id, params);
	},
	addNewTask(params) {
		return Api().post("tasks", params);
	},
	deleteTask(id) {
		return Api().delete("tasks/" + id);
	},

	// CATEGORIES
	fetchCats() {
		return Api().get("cats");
	},
	addNewCard(params) {
		return Api().post("cats", params)
	},
	deleteCard(id) {
		return Api().delete("cats/" + id);
	},
	editCard(params) {
		return Api().put("cats/" + params.id, params)
	}
};
