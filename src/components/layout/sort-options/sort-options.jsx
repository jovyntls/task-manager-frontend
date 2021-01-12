import { useDispatch, useSelector } from "react-redux";

function SortOption(props) {
	// const is_selected = useSelector((state) => state.tagsModalReducer.selected.includes(props.id));
	const dispatch = useDispatch();

	const toggleSort = (sort_by, ascending) => {
		dispatch({ type: "tasks/sort", payload: { ascending: ascending, sort: sort_by } });
	};

	return (
		<div>
			<div className="btn-group" role="group">
				<button
					type="button"
					className="btn btn-outline-secondary btn-sm"
					onClick={() => toggleSort("created_at", true)}
					active="true"
				>
					<i className="material-icons align-middle">schedule</i> Created
				</button>
				<button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => toggleSort("priority", false)}>
					<i className="material-icons align-middle">new_releases</i> Priority
				</button>
			</div>
		</div>
	);
}
export default SortOption;
