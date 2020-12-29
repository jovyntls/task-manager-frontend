import { connect } from "react-redux";
import { Component } from "./component";

const mapStateToProps = (state) => {
	return {
		tags: state.tagReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addTag: () => dispatch({ type: "ADD_TAG" }),
		removeTag: () => dispatch({ type: "REMOVE_TAG" }),
	};
};
export const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
