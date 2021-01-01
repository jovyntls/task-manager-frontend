import { connect } from "react-redux";
import SideBar from "./sidebar-component";

const mapStateToProps = (state) => {
	return {
		tags: state.tagsModalReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		dispatch,
	};
};

export const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);
