import React from 'react';

export default React.createContext({
	menuIsOpen: false,
	toggleMenu: () => {},
	pageHasMenu: true,
	setPageMenu: () => {},
	closeMenu: () => {},
});
