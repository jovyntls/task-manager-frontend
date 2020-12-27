import "../../App.css";
import "../stylesheets/sidebar.scss";
import { removeUserSession } from "../../Utils/Common";
import { useHistory } from "react-router-dom";

function SideBar() {
	const history = useHistory();
	const logout = () => {
		removeUserSession();
		history.push("/login");
	};

	return (
		<nav id="sidebar" className="m-0">
			<button onClick={logout} href="/login">
				sign out
			</button>
			<div className="sidebar-header">
				<h3>Welcome</h3>
			</div>
			<hr />
			TODO: create this sidebar
			{/* <h5>Sort by:</h5>
			<ul>
				<li>created time</li>
				<li>priority</li>
			</ul>
			<hr />
			<h5>Show tags:</h5>
			<span className="form-check ml-1">
				<input type="checkbox" className="form-check-input" />
				<label className="form-check-label">Select all</label>
			</span>
			<span className="form-check ml-1">
				<input type="checkbox" className="form-check-input" />
				<label className="form-check-label">something</label>
			</span> */}
		</nav>
	);
}
export default SideBar;
