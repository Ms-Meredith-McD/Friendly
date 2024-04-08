import React from "react"
import Page from './Page'
import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <Page title="Not found">
            <div className="text-center">
                <h2>Whoops, we cannot find that page</h2>
                <p className="lead text-muted">
                    You can always visit the <Link to="/">homepage</Link> for a fresh start!
                </p>
            </div>
        </Page>
    )
}

export default NotFound