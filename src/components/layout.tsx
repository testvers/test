import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { useLocation } from '@reach/router';

interface LayoutProps {
  children: React.ReactNode
}

export const Load = () => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  )
}

export const GET_Status = gql`
{
  switch {
      status
  }
}
`;

const Layout = ({ children }: LayoutProps) => {
  const data: any = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { loading, data: dataStatus } = useQuery(GET_Status);

  const location = useLocation();

  const siteTitle: string = data.site.siteMetadata?.title || `Title`

  return (
    <>
      <Header siteTitle={siteTitle} />
      {loading ? <Load /> : null}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        {location.pathname === '/log' ? <main>{children}</main> : dataStatus && dataStatus.switch.status ?
          <main>{children}</main>
          :
          <h1>Access Denied</h1>
        }
      </div>
    </>
  )
}

export default Layout
