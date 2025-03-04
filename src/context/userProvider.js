

"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { currentUser } from "@/services/currentUser";


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function load() {
      try {
        const tempUser = await currentUser();
        // console.log(tempUser);
        setUser({ ...tempUser });
      } catch (error) {
        console.log("error in loading current user, in user provider");
        // toast.error("error in loading current  user");
        setUser(undefined);
      }
    }
    load();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;