import React from 'react';
import {Link} from "react-router-dom";

const App: React.FC<{}> = (props) => {

	return (
		<div>
			<Link to={"/"}>Login</Link>
			{props.children}
		</div>
	);
};

export default App;