import "src/App.css";
import "src/components/stylesheets/sidebar.scss";
import { removeUserSession } from "src/Utils/Common";
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
			<a className="sign-out-button" onClick={logout} href="/login">
				<i className="material-icons align-middle small-icon mr-1">exit_to_app</i>
				sign out
			</a>
			<div className="sidebar-header">{/* <h3>Welcome</h3> */}</div>
			<hr />
			<h6>Sort:</h6>
			<SortOption />
			<hr />
			<h6>Filter:</h6>
			<SelectAllTags />
			<div className="ml-3">
				{Object.keys(tags.names).map((tag_id, i) => (
					<TagSelect title={tags.names[tag_id]} key={tag_id} id={parseInt(tag_id)} />
				))}
			</div>
			<TagSelect title="Untagged" key={-1} id={-1} />
		</nav>
	);
}
export default SideBar;
