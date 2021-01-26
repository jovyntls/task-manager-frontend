import { connect } from "react-redux";
import Card from "./card-component";

const mapStateToProps = (state) => {
	return {
		tags: state.tagsModalReducer.names,
		item_tags: state.tagsModalReducer.item_tags,
	};
};
const mapDispatchToProps = (dispatch) => {
	return { dispatch };
};

export const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);
