import { useDispatch, useSelector } from "react-redux";

function SelectAllTags() {
	const dispatch = useDispatch();
	const all_tags = useSelector((state) => Object.keys(state.tagsModalReducer.names).map((id) => parseInt(id)));
	const selected_tags = useSelector((state) => state.tagsModalReducer.selected);

	const is_allSelected = () => all_tags.length === selected_tags.length;

	const toggleSelectAll = () => {
		dispatch({ type: "select_all_tags", payload: is_allSelected() ? [] : all_tags });
	};

	return (
		<span className="form-check ml-1">
			<input type="checkbox" className="form-check-input" onChange={toggleSelectAll} checked={is_allSelected()} />
			<label className="form-check-label">Select all</label>
		</span>
	);
}
export default SelectAllTags;
