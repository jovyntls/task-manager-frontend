import { connect } from "react-redux";
import EditTagsModal from "./EditTagsModal";

const mapStateToProps = (state) => {
	return {
		tags: state.tagsModalReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchTags: () => dispatch({ type: "FETCH_TAGS" }),
	};
};

export const TagsModalContainer = connect(mapStateToProps, mapDispatchToProps)(EditTagsModal);
