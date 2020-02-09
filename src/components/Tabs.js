import React from 'react';

const Tabs = ({ labels, activeIndex, handleSelect, children }) => {
    return (
        <>
            <div className="tabs__tablist">
            {
                labels.map((label, i) => (
                    <a className={activeIndex == i ? 'tabs__tab--active tabs__tab' : 'tabs__tab'} onClick={() => {handleSelect(i)}} key={`tab-${i}`} >{label}</a>
                ))
            }
            </div>
            <div className="tabs__tab-content">
                {children}
            </div>
        </>
    );
}
Tabs.defaultProps = {
    labels: ['default prop'],
    activeIndex: 0,
    handleSelect: () => {console.log('handle select (default prop)')}
}
 
export default Tabs;