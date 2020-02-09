test('Context not working. Look into other renderers', () => {});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { LiftPage } from '../../pages/LiftPage';
// import { MenuContext } from '../../context/menu-context';
// import { weights, workouts } from '../fixtures/workout';

// test('should render Lift Page without props', () => {
//     const value= {
//         menuIsOpen: false,
//         toggleMenu: () => {},
//         pageHasMenu: true,
//         setPageMenu: () => {},
//     };

//     const wrapper = shallow(
//         <MenuContext.Provider value={value}>
//             <LiftPage />
//         </MenuContext.Provider>
//     );
//     expect(wrapper).toMatchSnapshot();
// });

// test('should render Lift Page with props', () => {
//     const value= {
//         menuIsOpen: false,
//         toggleMenu: () => {},
//         pageHasMenu: true,
//         setPageMenu: () => {},
//     };

//     const wrapper = shallow(
//         <MenuContext.Provider value={value}>
//             <LiftPage 
//                 workouts={workouts} 
//                 masterWeights={weights}
//                 match={{ params: { id: 'row' } }}
//             />
//         </MenuContext.Provider>
//     );
//     expect(wrapper).toMatchSnapshot();
// });

// test('should render Lift Page with chinups', () => {
//     const value= {
//         menuIsOpen: false,
//         toggleMenu: () => {},
//         pageHasMenu: true,
//         setPageMenu: () => {},
//     };

//     const wrapper = shallow(
//         <MenuContext.Provider value={value}>
//             <LiftPage 
//                 workouts={workouts} 
//                 masterWeights={weights}
//                 match={{ params: { id: 'chinup' } }}
//             />
//         </MenuContext.Provider>
//     );
//     expect(wrapper).toMatchSnapshot();
// });
