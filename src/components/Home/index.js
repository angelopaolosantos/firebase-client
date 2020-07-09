import React from 'react'
import { withAuthorization } from '../Session'
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home page is accessible by every signed in user</p>
        <ul>
            <li>
                <Link to={ROUTES.MARKETING_ASSETS} >Marketing Assets</Link>
            </li>
            <li>
                <Link to={ROUTES.SPIFFS} >Spiffs</Link>
            </li>
            <li>
                <Link to={ROUTES.FORMS} >Uneek Forms</Link>
            </li>
            <li>
                Inventory
            </li>
        </ul>
    </div>
)

// const condition = authUser => !!authUser

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)