import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../../Utils/Common";
import "../stylesheets/authentication.scss";

function LoginForm(props) {
	const [loading, setLoading] = useState(false);
	const username = useFormInput("");
	const password = useFormInput("");
	const [error, setError] = useState(null);

	// handle button click of login form
	const handleLogin = () => {
		setError(null);
		setLoading(true);
		axios
			.post("http://localhost:3000/login", { username: username.value, password: password.value })
			.then((response) => {
				setLoading(false);
				if (response.data.error) setError(response.data.error);
				else {
					setUserSession(response.data.token, response.data.user.id);
					localStorage.setItem("token", response.data.token);
					props.history.push("/board");
				}
			})
			.catch((error) => {
				setLoading(false);
				if (error.response && error.response.status === 401) setError(error.response.data.message);
				else setError("Something went wrong. Please try again later.");
			});
	};

	return (
		<div className="container auth__wrapper">
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div className="card auth__container p-5">
				<h1>Log In</h1>
				<small>
					Don't have an account? <a href="/signup">Sign up here</a>
				</small>
				<div className="d-flex align-items-center mt-2">
					<i className="material-icons mr-2">account_circle</i>
					<input className="form-control" placeholder="Username" type="text" {...username} />
				</div>
				<div className="d-flex align-items-center mt-2">
					<i className="material-icons mr-2">lock</i>
					<input className="form-control" placeholder="Password" type="password" {...password} />
				</div>
				{error && <small style={{ color: "red" }}>{error}</small>}
				<br />
				<input
					className="auth__submit"
					type="button"
					value={loading ? "Loading..." : "Log In"}
					onClick={handleLogin}
					disabled={loading}
				/>
			</div>
		</div>
	);
}

const useFormInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return {
		value,
		onChange: handleChange,
	};
};

export default LoginForm;
