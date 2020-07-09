import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'rsuite'

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        console.log(event)
        const { email, password } = this.state

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(()=> {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error=> {
                this.setState({ error })
            })

        //event.preventDefault() //rsuitejs has no preventDefault method
    }

    onChange = (formValue, event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const {email, password, error } = this.state

        const isInvalid = password === '' || email === ''

        return (
            <Form onSubmit={this.onSubmit}>

                <FormGroup>
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl 
                    name="email" 
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address" 
                    />
                    <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl 
                     name="password"
                     value={password}
                     onChange={this.onChange}
                     type="password"
                     placeholder="Password"
                    />
                    <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <Button appearance="primary" disabled={isInvalid} type="submit">Sign In</Button>
                </FormGroup>

                {error && <p>{error.message}</p>}
            </Form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)( SignInFormBase)

export default SignInPage
export { SignInForm }