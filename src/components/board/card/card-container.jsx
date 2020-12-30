import { connect } from "react-redux";
import Card from "./card-component";

const mapStateToProps = (state) => {
	return {
		tags: state.tagsModalReducer.names,
		// cat: state.boardReducer.find((x) => x.id === ownProps.cat_id),
	};
};
const mapDispatchToProps = (dispatch) => {
	return { dispatch };
};

export const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);
