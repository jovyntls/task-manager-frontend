import { useEffect } from "react";
import { useSelector } from "react-redux";

function WaterfallRefresher(props) {
	const refresh_check = useSelector((state) => state.waterfallReducer);
	useEffect(() => {
		if (props.waterfall[0] != undefined) {
			props.refresher();
		}
	});
	return <div></div>;
}
export default WaterfallRefresher;
