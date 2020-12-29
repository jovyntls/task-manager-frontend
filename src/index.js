import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch } from "react-router-dom";
import App from "./App";
import LoginForm from "./components/authentication/LoginForm";
import SignupForm from "./components/authentication/SignupForm";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import { store } from "./components/configure-store";
import { Container } from "./components/tags/container";

import { fetchTags } from "./components/tags-modal/tags-modal-reducer";
store.dispatch(fetchTags);

const Wrapper = () => {
	return (
		<Provider store={store}>
			{/* <React.StrictMode> */}
			<BrowserRouter>
				<Container />
				<Switch>
					<PrivateRoute exact path="/" component={App} />
					<PublicRoute exact path="/login" component={LoginForm} />
					<PublicRoute exact path="/signup" component={SignupForm} />
				</Switch>
			</BrowserRouter>
			{/* </React.StrictMode> */}
		</Provider>
	);
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
