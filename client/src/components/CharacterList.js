import React, { Component } from "react";
import uuid from "uuid";
import Character from "./Character";

const CharacterList = props => {
	console.log("CHARACTERLIST PROPS: ", props);
	return (
		<div>
			{props.characters.map((char, index) => {
				// insert key here
				<div key={uuid()} className="CharacterList">
					<Character char={char} index={index} />;
				</div>;
			})}
		</div>
	);
};

export default CharacterList;
