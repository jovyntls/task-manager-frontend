import Api from "./Api";

const Services = {
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
		return Api().post("cats", params);
	},
	deleteCard(id) {
		return Api().delete("cats/" + id);
	},
	editCard(params) {
		return Api().put("cats/" + params.id, params);
	},

	// TAGS
	fetchTags() {
		return Api().get("tags");
	},
	fetchTagsFromCat(params) {
		return Api().get("items_tags/by_cat/" + params.cat_id);
	},

	// ITEM_TAGS
	deleteItemTag(params) {
		return Api().delete("items_tags/" + params.tag_id + "/" + params.cat_id);
	},
	addItemTag(params) {
		return Api().post("items_tags/", params);
	},
};

export default Services;
