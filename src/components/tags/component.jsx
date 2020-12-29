import React from "react";

export const Component = ({ tags, addTag, removeTag }) => (
	<div>
		<h1>hello react redux</h1>
		<p>
			<ul>
				{console.log(tags)}
				{tags.map((item) => (
					<li>{item}</li>
				))}
			</ul>
		</p>
		<button onClick={addTag}>add</button>
		<button onClick={removeTag}>remove</button>
	</div>
);
