import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const watchlive = () => {
    const switchs = true;
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

export default watchlive;