import React from 'react';

import { graphql, StaticQuery, Link} from 'gatsby';
import {Carousel, Navbar, Nav} from "react-bootstrap";
//Aqui se va a mostrar la lista de todos los nodos disponibles
const Contenido=({data,props}) => (
  <StaticQuery
    query={graphql`
     query {
     sitePlugin(name: {eq: "gatsby-source-drupal"}) {
        pluginOptions {
            baseUrl}
            }
        allNodeNoticia(sort: {fields: [created],order: ASC}) {
            edges {
                node {
                    title
                    path {
                        alias
                    }
                     relationships {
                      field_imagen {
                        uri{
                          url
                        }
                      }
                    }
                    body {
                        value
                        summary
                    }
                }
            }
        }
        allNodeArticle(sort: {fields: [created],order: ASC}) {
            edges {
                node {
                    title
                    path {
                        alias
                    }
                    relationships {
                      field_image {
                        uri{
                          url
                        }
                      }
                    }
                    body {
                        value
                        summary
                    }
                }
            }
        }
        }
    `}
    render={ data => {
      const myurl =data.sitePlugin.pluginOptions.baseUrl;
      const head =
        <Navbar className="navbar-custom" variant="dark">

        <Nav className="collapse navbar-collapse justify-content-center">
          <Nav.Link href="../">Inicio</Nav.Link>
          <Nav.Link href="../introduccion">Introducción</Nav.Link>
          <Nav.Link href="../antecedentes">Antecedentes</Nav.Link>
          <Nav.Link href="#features">Alcance</Nav.Link>
          <Nav.Link href="#home">Gestión</Nav.Link>
          <Nav.Link href="#features">Diseño</Nav.Link>
          <Nav.Link href="#pricing">Análisis</Nav.Link>
          <Nav.Link href="#home">Implementacion</Nav.Link>
          <Nav.Link href="#features">Implantacion</Nav.Link>
          <Nav.Link href="#pricing">Conclusion</Nav.Link>
        </Nav>
      </Navbar>



      return <section >{head}</section>;
    }}
  />)

export default Contenido
