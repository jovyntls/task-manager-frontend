import "../App.css";

function Tag(props) {
	return (
		<span className="badge badge-pill badge-secondary" style={{"opacity": 0.5}}>{props.title}</span>
	);
}
export default Tag;
