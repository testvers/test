import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const fuckNow = () => {
  const switchs = true;
  return (
    <Layout>
      {switchs ?
      (<h1 className="soon">Coming soon...</h1>)
      :
      (<h1 className="soon">For Custom users only</h1>)
      }
    </Layout>
  );
}

export default fuckNow