import { useDispatch, useSelector } from "react-redux";

function SortOption(props) {
	// const is_selected = useSelector((state) => state.tagsModalReducer.selected.includes(props.id));
	const dispatch = useDispatch();

	const toggleSort = () => {
		dispatch({ type: "tasks/sort", payload: { order: "DESC", sort: "created_at" } });
	};

	return (
		<div>
			<button onClick={toggleSort}>back sort</button>
		</div>
	);
}
export default SortOption;
