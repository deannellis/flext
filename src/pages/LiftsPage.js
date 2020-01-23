import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import SideNav from '../components/SideNav';
import Tabs from '../components/Tabs';
import LineGraph from '../components/LineGraph';

class LiftsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            activeTab: 0
        }
    }

    getData = () => {
        const { workouts } = this.props;
        let filteredWorkouts = [];
        workouts.map(workout => {
            let workoutWithDate = {}
            if(workout.hasOwnProperty('squat')) {
                workoutWithDate = {
                    ...workout['squat'],
                    date: workout.created
                }
                filteredWorkouts.push(workoutWithDate)
            }
        })
        // console.log('fw', filteredWorkouts);
        return filteredWorkouts
    }

    render() { 
        return (
            <div className="page--with-side-nav">
                <SideNav path={this.props.match.path} />
                <div className="lifts-page">
                    <Tabs 
                        activeIndex={this.state.activeTab} 
                        handleSelect={i => this.setState({ activeTab: i })}
                        labels={['Bench Press', 'Deadlift', 'Overhead Press', 'Row', 'Squat']}
                    >
                        <LineGraph data={this.getData()}/>

                        {/* {this.state.activeTab === 0 && 
                            <p>1</p>
                        }
                        {this.state.activeTab === 1 && 
                            <p>2</p>
                        }
                        {this.state.activeTab === 2 && 
                            <p>3</p>
                        }
                        {this.state.activeTab === 3 && 
                            <p>4</p>
                        }
                        {this.state.activeTab === 4 && 
                            <p>5</p>
                        } */}
                    </Tabs>
                </div>
            </div>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        workouts: state.workouts,
    };
}
 
export default withRouter(connect(mapStateToProps)(LiftsPage));