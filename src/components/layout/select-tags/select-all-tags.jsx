import { useDispatch, useSelector } from "react-redux";
import "jquery/dist/jquery.min.js";

function SelectAllTags() {
	const dispatch = useDispatch();
	const all_tags = useSelector((state) => Object.keys(state.tagsModalReducer.names).map((id) => parseInt(id)));
	const selected_tags = useSelector((state) => state.tagsModalReducer.selected);

	const is_allSelected = () => all_tags.length === selected_tags.filter((x) => x >= 0).length;
	const is_noneSelected = () => selected_tags.filter((x) => x >= 0).length === 0;

	const toggleSelectAll = () => {
		dispatch({ type: "select_all_tags", payload: is_allSelected() ? [] : all_tags });
	};

	const toggleCheckboxStyle = () => {
		const select_all_checkbox = document.getElementById("select-all-checkbox");
		if (!is_allSelected() && !is_noneSelected()) {
			select_all_checkbox.indeterminate = true;
		} else if (Boolean(select_all_checkbox)) {
			select_all_checkbox.indeterminate = false;
		}
	};
	toggleCheckboxStyle();

	return (
		<span className="form-check ml-1">
			<input
				id="select-all-checkbox"
				type="checkbox"
				className="form-check-input"
				onChange={toggleSelectAll}
				checked={is_allSelected()}
			/>
			<label className="form-check-label">Select all</label>
		</span>
	);
}
export default SelectAllTags;
