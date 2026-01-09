import { createContext } from "react";

const ConfigContext = createContext({
    selectedMenu: '',
    setSelectedMenu: (menu: string) => { },
});

export default ConfigContext;