export default function waterfallReducer(refresh = 0, action) {
	switch (action.type) {
		case "refresh_layout": {
			return ++refresh;
		}
		default:
			return refresh;
	}
}
