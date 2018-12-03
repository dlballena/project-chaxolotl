/**
 * ************************************
 *
 * @module  Convo
 * @author
 * @date
 * @description presentation component that renders a single conversation
 *
 * ************************************
 */

 import React from 'react';
 
 const Convo = ({id, name, selectConvo}) => (
	 	<div className="convo" id={id} onClick={() => selectConvo(id)} style={style.convo}>
			<p className="name">{name}</p>
		</div>
 );

 const style = {
	 convo: {
		 border: "0.2rem solid red"
	 }
 }

 export default Convo;