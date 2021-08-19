import { useQuery } from "@apollo/client";
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GET_Status } from "./log";

const watchlive = () => {
    const { loading, error, data } = useQuery(GET_Status);
    let switchs = false
    // if (data) {
    // switchs = data.status;
    // }
    if (switchs) {
    return (
        <Layout>
            <h1 className="soon">Coming soon...</h1>
            <p style={{color: 'red'}}>Only premium members can have access to live video section.</p>
            <p style={{color: 'green'}}>Announcing soon.</p>
        </Layout>
    )
    }
    else{
    return (
        <Layout>
            <h1 className="soon">Access denied</h1>
        </Layout>
    )
    };
}

export default watchlive;