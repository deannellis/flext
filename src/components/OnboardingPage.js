import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setMasterWeights } from '../actions/masterWeights';
import StartingWeightForm from '../components/StartingWeightForm';

class OnboardingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    onMasterWeightsSubmit = (masterWeights) => {
        this.props.dispatch(setMasterWeights(masterWeights));
        this.props.history.push('/home');
    }

    componentDidMount() {
        if(Object.entries(this.props.masterWeights).length !== 0 && this.props.masterWeights.constructor === Object) {
            this.props.history.push('/home');
            console.log('wtf')
        }
    }

    render() { 
        return (
            <div>
                <StartingWeightForm onSubmit={this.onMasterWeightsSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights,
    };
}
 
export default withRouter(connect(mapStateToProps)(OnboardingPage));