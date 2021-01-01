import { useDispatch, useSelector } from "react-redux";

function TagSelect(props) {
	const is_selected = useSelector((state) => state.tagsModalReducer.selected.includes(props.id));
	const dispatch = useDispatch();

	const toggleSelect = () => {
		dispatch({ type: "select_tags", payload: props.id });
	};

	return (
		<span className="form-check ml-1">
			<input type="checkbox" className="form-check-input" checked={is_selected} onChange={toggleSelect} />
			<label className="form-check-label">{props.title}</label>
		</span>
	);
}
export default TagSelect;
