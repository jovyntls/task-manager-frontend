import axios from "axios";

const Api = () => {
	const instance = axios.create({
		// baseURL: "http://localhost:3000/",
		baseURL: "https://secret-temple-43663.herokuapp.com/", // for production
	});

	instance.interceptors.request.use(
		function (config) {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers["Authorization"] = "Bearer " + token;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	return instance;
};

export default Api;
