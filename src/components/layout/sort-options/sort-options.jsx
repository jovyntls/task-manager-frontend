import { useDispatch } from "react-redux";
import "src/components/stylesheets/sidebar.scss";

function SortOption() {
	const dispatch = useDispatch();

	const toggleSort = (sort_by, ascending) => {
		dispatch({ type: "tasks/sort", payload: { ascending: ascending, sort: sort_by } });
	};

	return (
		<div>
			<div className="btn-group" role="group">
				<button
					type="button"
					className="btn btn-outline-dark btn-sm"
					onClick={() => toggleSort("created_at", true)}
					active="true"
				>
					<i className="material-icons align-middle med-icon">schedule</i> Created
				</button>
				<button type="button" className="btn btn-outline-dark btn-sm" onClick={() => toggleSort("priority", false)}>
					<i className="material-icons align-middle med-icon">new_releases</i> Priority
				</button>
			</div>
		</div>
	);
}
export default SortOption;
