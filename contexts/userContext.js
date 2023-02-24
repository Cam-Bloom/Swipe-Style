import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unSubAuthState = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setUser(uid)
			} else {
        setUser(null)
				console.log("no user signed in");
			}
		});

		return unSubAuthState;
	}, []);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
