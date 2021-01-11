import "../../App.css";
import "../stylesheets/sidebar.scss";
import { removeUserSession } from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import TagSelect from "./select-tags/tag-select";
import SelectAllTags from "./select-tags/select-all-tags";
import SortOption from "./sort-options/sort-options";

function SideBar({ tags }) {
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
			<h5>Sort by:</h5>
			<SortOption />
			<ul>
				<li>created time</li>
				<li>priority</li>
			</ul>
			<hr />
			<h5>Filter tags:</h5>
			<SelectAllTags />
			<div className="ml-3">
				{Object.keys(tags.names).map((tag_id, i) => (
					<TagSelect title={tags.names[tag_id]} key={tag_id} id={parseInt(tag_id)} />
				))}
			</div>
			<TagSelect title="untagged" key={-1} id={-1} />
		</nav>
	);
}
export default SideBar;
