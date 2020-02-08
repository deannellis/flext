import React from 'react';

export const MenuContext = React.createContext({ 
    menuIsOpen: false,
    toggleMenu: () => {},
    pageHasMenu: true,
    setPageMenu: () => {},
});