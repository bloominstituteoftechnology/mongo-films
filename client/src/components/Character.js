import React, { Component } from "react";
// material components
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";

const Character = props => {
	console.log("CHARACTER PROPS: ", props);
	return (
		<Card>
			<CardHeader>
				<CardTitle title={props.char.name} />
			</CardHeader>
			<CardText>{props.char.gender}</CardText>
			<CardText>{props.char.skin_color}</CardText>
			<CardText>{props.char.hair_color}</CardText>
			<CardText>{props.char.height}</CardText>
			<CardText>{props.char.eye_color}</CardText>
			<CardText>{props.char.birth_year}</CardText>
			<CardText>{props.char.homeworld}</CardText>
		</Card>
	);
};

export default Character;
