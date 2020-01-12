import React, { Component } from 'react';
import Button from './Button';
import Calendar from './Calendar';
import SetupForm from './SetupForm';
import Tabs from './Tabs';

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
                <Button variant="primary">primary button</Button>
                <Button>default button</Button>
                <Button variant="text">tertiary button</Button>
                <Button disabled={true}>disabled button</Button>
                <SetupForm />
            </>
        );
    }
}
 
export default HomePage;