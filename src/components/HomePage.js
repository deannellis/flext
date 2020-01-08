import React, { Component } from 'react';
import Tabs from './Tabs';
import Calendar from './Calendar';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        }
    }

    render() { 
        return (
            <>
                <h1>Homepage Here</h1>
                <Tabs 
                    activeIndex={this.state.activeTab} 
                    handleSelect={i => this.setState({ activeTab: i })}
                    labels={['Tab 1', 'Tab 2']}
                >
                    {this.state.activeTab === 0 && <p>Tab 1 content</p>}
                    {this.state.activeTab === 1 && <p>Tab 2 content</p>}
                </Tabs>
                <Calendar />
            </>
        );
    }
}
 
export default HomePage;