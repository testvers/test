import Layout from "../components/layout"
import React, { useContext } from 'react';
import { IdentityContext } from "../../netlifyIdentityContext";
import { Button } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_Status = gql`
{
  switch {
    status
  }
}
`;

const UPDATE_Switch = gql`
    mutation flipSwitch {
        flipSwtich {
            status
        }
    }
`;

const LogInPage = () => {
    const [flipSwitch] = useMutation(UPDATE_Switch);
    const { identity: netlifyIdentity } = useContext(IdentityContext);
    const { user } = useContext(IdentityContext);
console.log(
    user
);

    const UpdateSwtich = () => {

            flipSwitch({
                variables: {
                    status
                },
                refetchQueries: [{ query: GET_Status }],
            });
        }
    

    return (
        <Layout>
            {user! ?
                <Button className="soon" color="primary" variant="contained" onClick={() => { netlifyIdentity.open() }}>LogIn</Button>
                :
                <Button className="soon" color="secondary" variant="contained" onClick={() => {UpdateSwtich()}}>switch</Button>
            }
        </Layout>
    )
}

export default LogInPage
