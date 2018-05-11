import React, { Component } from "react";
// material components
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";

const Character = props => {
	console.log("CHARACTER PROPS: ", props);
	return (
		<Card>
			{/* render character data here */}
			<h3>This is a card for a character</h3>
		</Card>
	);
};

export default Character;
