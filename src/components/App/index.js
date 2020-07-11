import React from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import MarketingAssetsPage from '../MarketingAssets'
import SpiffsPage from '../Spiffs'
import FormsPage from '../Forms'
import PageMissingPage from '../PageMissing'
import ProductUpload from '../Admin/Products'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const App = () => (
    <Router>
        <div>
            <Navigation />
            <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.MARKETING_ASSETS} component={MarketingAssetsPage} />
            <Route path={ROUTES.SPIFFS} component={SpiffsPage} />
            <Route path={ROUTES.FORMS} component={FormsPage} />
            <Route path={ROUTES.PRODUCT_UPLOAD} component={ProductUpload} />
            <Route component={PageMissingPage} />
            </Switch>
        </div>
    </Router>
)

export default withAuthentication(App)