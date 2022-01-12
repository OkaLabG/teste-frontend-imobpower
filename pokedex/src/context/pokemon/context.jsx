import React, { createContext, useState } from "react";

//Valor default do contexto
const DEFAULT_VALUE = {
  state: {
    offSetPage: 0,
  },
  setState: () => {}, //função de inicialização
};

//criando nosso contexto UserContext
const UserContext = createContext(DEFAULT_VALUE);

/**
 * Função que irá conter o estado e função que irá alterar o estado 'setState'
 * quer irá prover o contexto para os componentes filhos da árvore
 */
const UserContextProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <UserContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContextProvider };
export default UserContext;