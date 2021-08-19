import Layout from "../components/layout"
import React, { useContext } from 'react';
import { IdentityContext } from "../../netlifyIdentityContext";
import { Button } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// export const GET_Status = gql`
// {
//   switch {
//     status
//   }
// }
// `;

export const GET_Status = gql`
{
  switch {
      status
  }
}
`;

const UPDATE_Switch = gql`
    mutation flipSwitch($status: Boolean!) {
        flipSwtich(status: $status) {
            status
        }
    }
`;

const LogInPage = () => {
    const { loading, error, data } = useQuery(GET_Status);
    const [flipSwitch] = useMutation(UPDATE_Switch);
    const { identity: netlifyIdentity } = useContext(IdentityContext);
    const { user } = useContext(IdentityContext);
    
    if (loading) {
        console.log("Loading...");
        
    };
    if (error) {
        console.log(error);
    };
    if (data) {
       console.log(data);
    }
    let status = true;
    status = data && data.switch && data.switch.status;
    const UpdateSwtich = () => {

            flipSwitch({
                variables: {
                    status
                },
                // refetchQueries: [{ query: GET_Status }],
            });
        }
    return (
        <Layout>
            {!user ?
                <Button className="soon" color="primary" variant="contained" onClick={() => { netlifyIdentity.open() }}>LogIn</Button>
                :
                user && user.id === "6f146b1c-8e8e-4781-b1bf-3b7f3ec4c4aa" || "47954610-39d3-43a5-bfb4-b4a9e631c9d6"?
                <Button className="soon" color="secondary" variant="contained" onClick={() => {UpdateSwtich()}}>switch</Button>
                :
                null
            }
        </Layout>
    )
}

export default LogInPage
