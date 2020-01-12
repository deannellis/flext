import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import Calendar from './Calendar';
import SetupForm from './SetupForm';
import Tabs from './Tabs';
import DashboardTab from './DashboardTab';

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
                <Tabs 
                    activeIndex={this.state.activeTab} 
                    handleSelect={i => this.setState({ activeTab: i })}
                    labels={['Dashboard', 'Tab 2']}
                >
                    {this.state.activeTab === 0 && 
                        <DashboardTab masterWeights={this.props.masterWeights} />
                    }
                    {this.state.activeTab === 1 && <p>Tab 2 content</p>}
                </Tabs>
                {/* <Calendar />
                <Button variant="primary">primary button</Button>
                <Button>default button</Button>
                <Button variant="text">tertiary button</Button>
                <Button disabled={true}>disabled button</Button>
                <SetupForm /> */}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights
    };
}
 
export default connect(mapStateToProps)(HomePage);