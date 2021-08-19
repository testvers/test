import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const watchlive = () => {
    return (
        <Layout>
            <SEO title="Watch Live" />
            <p style={{color: 'red'}}>Only premium members can have access to live video section.</p>
            <p style={{color: 'green'}}>Announcing soon.</p>
        </Layout>
    )
}

export default watchlive;