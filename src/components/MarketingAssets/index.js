import React, { Component } from 'react'
import { compose } from 'recompose'

import  { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'
import * as ROLES from '../../constants/roles'

class MarketingAssetsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            marketingAssets: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true})
        this.props.firebase.marketingAssets().on('value', snapshot => {
            const marketingAssetsObject = snapshot.val()
            const marketingAssetsList = Object.keys(marketingAssetsObject).map(key=> ({
                ...marketingAssetsObject[key],
                uid: key,
            }))

            this.setState({
                marketingAssets: marketingAssetsList,
                loading: false,
            })
        })
    }

    componentWillUnmount() {
        this.props.firebase.marketingAssets().off()
    }

    render() {
        const { marketingAssets, loading } = this.state
        
        return (
            <div>
                <h1>Marketing Assets</h1>
                <p>Marketing Assets</p>
                {loading && <div>Loading ...</div>}

                <MarketingAssetsList marketingAssets={marketingAssets} />
            </div>
        )
    }
}

const MarketingAssetsList = ({ marketingAssets }) => (
    <ul>
        {marketingAssets.map(marketingAsset => {
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
                    <strong>URL:</strong> <a href={marketingAsset.URL}> Download </a>
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
)(MarketingAssetsPage)