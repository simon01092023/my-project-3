import { createContext, useContext } from 'react';



export const UserContext = createContext(null);


export function UserProvider({children, loggedUser}){
	console.log(loggedUser, 'in userProvide')
	// Chilren is whatever your component is that you are rendering!
	// The UserProvider is being used in the Layout Page, If not using it you can 
	// wrap your routes in it in the app.js, this will provide the value
	// to all the components it is being rendered by (notice we still have to 
	// pass the loggedUsing down to the layout)
	return (
		<UserContext.Provider value={loggedUser}>
			{children}
		</UserContext.Provider>
	)
}

// this is creating a custom hook!
// You can import this function into any component 
// you want and use it just like a hook and it will
// give you the logged in User!!!!! from the App component
// ex: const loggedUser = useLoggedUser()
// check out the PostCard component for an example!

export function useLoggedUser(){
	return useContext(UserContext)
}