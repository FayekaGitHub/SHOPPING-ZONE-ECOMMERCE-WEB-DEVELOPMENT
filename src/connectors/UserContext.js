import React, { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children }) =>
 {
      const loggedInUser=localStorage.getItem('loggedIn') || '';
      const [user, setUser] = useState(loggedInUser);
      const fixUser = (username) =>
       {
          localStorage.setItem('loggedIn',username);
          setUser(username);
       };
       const removeUser = () =>
       {
          setUser('');
          localStorage.removeItem("loggedIn");
       };
      return (
        <UserContext.Provider value={{user,fixUser,removeUser}}>
          {children}
        </UserContext.Provider>
      );
};