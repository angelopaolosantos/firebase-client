import React from 'react'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'
import { Component } from 'react'

class SignOutButtonBase extends Component {

    doSignOut = () => {
        this.props.firebase.doSignOut()
        .then(()=>{
            this.props.history.push(ROUTES.LANDING)
        })
    }

    render() {
        return (
            <button type="button" onClick={this.doSignOut}>
                Sign Out
            </button>
        )
    }
}

const SignOutButton = compose(
    withRouter,
    withFirebase,
)(SignOutButtonBase)

export default SignOutButton