import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/card.scss";
import EditTag from "./EditTag";

function EditTagsModal(props) {
	return (
		// <div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">
					Edit tags for: <strong>{props.cat.title}</strong>
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div>
					{Object.keys(props.tags).map((item, i) => (
						<EditTag all_tags={props.tags} cat={props.cat} title={props.tags[item]} id={item} key={i} />
					))}
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">
					Close
				</button>
				<button type="button" class="btn btn-primary">
					Save changes
				</button>
			</div>
		</div>
		//     </div>
	);
}

export default EditTagsModal;
