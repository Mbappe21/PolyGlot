import { createContext } from "react";
import { get20Request } from "../datas/get20Requests";

export const DataContext = createContext()

export const DataRequestProvider = ({children}) => {

    const requests = get20Request()

    return (
        <DataRequestProvider value={{requests}} >
            {children}
        </DataRequestProvider>
    )
}