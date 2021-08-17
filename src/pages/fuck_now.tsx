import { useQuery } from "@apollo/client";
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GET_Status } from "./log";

const fucknow = () => {
    const { loading, error, data } = useQuery(GET_Status);
    const switchs = data.status;
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

export default fucknow;