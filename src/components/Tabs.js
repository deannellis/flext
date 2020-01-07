import React from 'react';

const Tabs = (props) => {
    return (
        <>
            <div className="tabs__tablist">
            {
                props.labels.map((label, i) => (
                    <a className={props.activeIndex == i ? 'tabs__tab--active tabs__tab' : 'tabs__tab'} onClick={() => {props.handleSelect(i)}} key={`tab-${i}`} >{label}</a>
                ))
            }
            </div>
            <div className="tabs__tab-content">
                {props.children}
            </div>
        </>
    );
}
 
export default Tabs;