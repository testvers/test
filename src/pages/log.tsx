import Layout from "../components/layout"
import React, { useContext } from 'react';
import { IdentityContext } from "../../netlifyIdentityContext";
import { Button } from '@material-ui/core';

const LogInPage = () => {
    const { identity: netlifyIdentity } = useContext(IdentityContext);
    const { user } = useContext(IdentityContext);
    return (
        <Layout>
            {user! ?
                <Button className="soon" color="primary" variant="contained" onClick={() => { netlifyIdentity.open() }}>LogIn</Button>
                :
                <Button className="soon" color="secondary" variant="contained" onClick={() => {}}>switch</Button>
            }
        </Layout>
    )
}

export default LogInPage