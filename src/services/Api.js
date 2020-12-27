import axios from "axios";

const Api = () => {
	const api_url = process.env.NODE_ENV == "production" ? "https://secret-temple-43663.herokuapp.com/" : "http://localhost:3000/";
	const instance = axios.create({
		baseURL: api_url,
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
