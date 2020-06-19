import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                authUser: null,
                authRole: null
            }
        }

        componentDidMount() {

            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({ authUser, authRole: this.props.firebase.getRole(authUser.uid) })
                        : this.setState({ authUser: null, authRole: null })
                }
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            console.log(JSON.stringify(this.state.authUser))
            if (this.state.authUser) {
                console.log(JSON.stringify(this.state.authUser.uid))
            }
           
            return (
            <AuthUserContext.Provider value={this.state.authUser}>
                <Component {...this.props} />
            </AuthUserContext.Provider>
            )
        }
    }

    return withFirebase(WithAuthentication)
}

export default withAuthentication