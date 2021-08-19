import { useQuery } from "@apollo/client";
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GET_Status, test } from "./log";

const now = () => {
    const { loading, error, data } = useQuery(GET_Status);
    let switchs = true

if (error) {
    console.log(error);
    }
    if (loading) {
    console.log('loading');
    }
    if (data) {
    console.log(data);
    }
    if (switchs) {
    return (
        <Layout>
            <h1 className="soon">Coming soon...</h1>
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

export default now;