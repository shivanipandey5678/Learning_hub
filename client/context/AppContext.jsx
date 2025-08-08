import { createContext } from "react";

export const AppContext=createContext();
const currency='$';
const value={
   currency
};

const AppContextProvider = ({children})=> {
   return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}
export default AppContextProvider;