import { connect } from "react-redux";
import BoardView from "./board-component";

const mapStateToProps = (state) => {
	return {
		cats: state.boardReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	return { dispatch };
};

export const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardView);
