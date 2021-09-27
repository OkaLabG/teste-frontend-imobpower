import React from "react";

import { UserContextProvider } from "./user/context";

const GlobalContext = ({ children }) => {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>;
    </>
  );
};

export default GlobalContext;