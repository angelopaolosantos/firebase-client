import React, { Component } from 'react'
import { compose } from 'recompose'

import  { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'
import * as ROLES from '../../constants/roles'

class FormsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            forms: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true})
        this.props.firebase.forms().on('value', snapshot => {
            const formsObject = snapshot.val()
            const formsList = Object.keys(formsObject).map(key=> ({
                ...formsObject[key],
                uid: key,
            }))

            this.setState({
                forms: formsList,
                loading: false,
            })
        })
    }

    componentWillUnmount() {
        this.props.firebase.forms().off()
    }

    render() {
        const { forms, loading } = this.state
        
        return (
            <div>
                <h1>Forms</h1>
                <p>Forms</p>
                {loading && <div>Loading ...</div>}

                <FormsList forms={forms} />
            </div>
        )
    }
}

const FormsList = ({ forms }) => (
    <ul>
        {forms.map(marketingAsset => {
        console.log(marketingAsset);
        return (
            <li key={marketingAsset.id}>
                <span>
                    <strong>ID:</strong> {marketingAsset.id}
                </span>
                <span>
                    <strong>NAME:</strong> {marketingAsset.Name}
                </span>
                <span>
                    <strong>DESCRIPTION:</strong> {marketingAsset.Description}
                </span>
                <span>
                    <strong>URL:</strong> {marketingAsset.URL}
                </span>
            </li>
            )
        }
        )}
    </ul>
)

const condition = authUser => 
    authUser

export default compose(
    withAuthorization(condition),
    withFirebase,
)(FormsPage)