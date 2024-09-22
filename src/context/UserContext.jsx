import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [sevedScholarship, setSevedScholarship] = useState(JSON.parse(localStorage.getItem("savedScholarships")) || []    );


    return (
        <UserContext.Provider value={{ user, setUser,sevedScholarship, setSevedScholarship }}>
            {children}
        </UserContext.Provider>
    );
};
