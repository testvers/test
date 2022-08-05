import Layout, {  Load } from "../components/layout"
import React, { useContext } from 'react';
import { IdentityContext } from "../../netlifyIdentityContext";
import { Button } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

/*const UPDATE_Switch = gql`
    mutation flipSwitch($status: Boolean!) {
        flipSwtich(status: $status) {
            status
        }
    }
`;
*/
const LogInPage = () => {
  //  const [flipSwitch, {loading}] = useMutation(UPDATE_Switch);
    const { identity: netlifyIdentity } = useContext(IdentityContext);
    const { user } = useContext(IdentityContext);
   // const { loading: statusLoad , data: dataStatus } = useQuery(GET_Status);
/*
    let status = dataStatus? dataStatus.switch.status: true;

    const UpdateSwtich = () => {
            flipSwitch({
                variables: {
                    status: !status
                },
                refetchQueries: [{ query: GET_Status }],
            });
        }*/
    return (
        <Layout>
            {loading <Load/>: null}
            {!user ?
                <Button className="soon" color="primary" variant="contained" onClick={() => { netlifyIdentity.open() }}>LogIn</Button>
                :
                user && user.id === "6f146b1c-8e8e-4781-b1bf-3b7f3ec4c4aa" || "47954610-39d3-43a5-bfb4-b4a9e631c9d6"?
                <Button className="soon" color="secondary" variant="contained" onClick={UpdateSwtich}>switch</Button>
                :
                null
            }
        </Layout>
    )
}

export default LogInPage
