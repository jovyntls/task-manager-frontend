import Api from "./Api";

export default {
	fetchTasks() {
		return Api().get("tasks");
	},
	fetchTasksFromCat(cat_id) {
		return Api().get("tasks/cat/" + cat_id);
	},
	fetchCats() {
		return Api().get("cats");
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
	// signUpUser(params) {
	// 	return Api().post("sign-up", params);
	// },
	// logInUser(params) {
	// 	return Api().post("log-in", params); //, { withCredentials: true }
	// },
	// logout() {
	// 	return Api().get("logout", { withCredentials: true });
	// },
	// addUser(params) {
	// 	return Api().post("users", params);
	// },
};
