import "src/App.css";

function Tag(props) {
	return (
		<button className="badge badge-pill badge-secondary mr-1" disabled style={{ border: "0px solid grey" }}>
			{props.title}
		</button>
	);
}
export default Tag;
