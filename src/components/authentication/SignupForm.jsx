import React, { useState } from "react";
import PostService from "../../services/PostService";
import { setUserSession } from "../../Utils/Common";
import "../stylesheets/authentication.scss";

function LoginForm(props) {
	const [loading, setLoading] = useState(false);
	const username = useFormInput("");
	const password = useFormInput("");
	const [error, setError] = useState(null);

	// handle button click of login form
	const handleSignup = () => {
		setError(null);
		setLoading(true);
		PostService.signup({ username: username.value, password: password.value })
			.then((response) => {
				setLoading(false);
				if (response.data.error) setError(response.data.error);
				else {
					setUserSession(response.data.token, response.data.user.id);
					localStorage.setItem("token", response.data.token);
					props.history.push("/");
				}
			})
			.catch((error) => {
				setLoading(false);
				if (error.response.status === 401) setError(error.response.data.message);
				else setError("Something went wrong. Please try again later.");
			});
	};

	return (
		<div className="container auth__wrapper">
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<div className="card auth__container p-5">
				<h1>Sign up</h1>
				<small>
					Already have an account? <a href="/login">Log in here</a>
				</small>
				<div className="d-flex align-items-center mt-2">
					<i className="material-icons mr-2">account_circle</i>
					<input className="form-control" placeholder="Username" type="text" {...username} />
				</div>
				<div className="d-flex align-items-center mt-2">
					<i className="material-icons mr-2">lock</i>
					<input className="form-control" placeholder="Password" type="password" {...password} />
				</div>
				{error && (
					<>
						<small style={{ color: "red" }}>{error}</small>
					</>
				)}
				<br />
				<input
					className="auth__submit"
					type="button"
					value={loading ? "Loading..." : "Sign up"}
					onClick={handleSignup}
					disabled={loading}
				/>
				<br />
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
