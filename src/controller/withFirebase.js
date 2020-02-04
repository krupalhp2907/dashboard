import React from 'react';
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
	<FirebaseContext.Consumer>
		{controller => <Component {...props} controller={controller} />}
	</FirebaseContext.Consumer>
);

export default FirebaseContext;