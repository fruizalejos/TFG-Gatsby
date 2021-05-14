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
        <Navbar.Brand href="/">Inicio</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="introduccion">Introducción</Nav.Link>
          <Nav.Link href="#pricing">Antecedentes</Nav.Link>
          <Nav.Link href="#features">Alcance</Nav.Link>
          <Nav.Link href="#home">Gestión</Nav.Link>
          <Nav.Link href="#features">Diseño</Nav.Link>
          <Nav.Link href="#pricing">Antecedentes</Nav.Link>
          <Nav.Link href="#home">Implementacion</Nav.Link>
          <Nav.Link href="#features">Implantacion</Nav.Link>
          <Nav.Link href="#pricing">Conclusion</Nav.Link>
        </Nav>
      </Navbar>
      const articuloList= data.allNodeArticle.edges.map(post =>(
          <div className="container">
            <hr></hr>
            <div className="row">
              <h2 >{post.node.title}</h2>
              <div className="col-12 col col-md-6 text left">
                {post.node.relationships.field_image ? <img src={myurl + post.node.relationships.field_image.uri.url} alt={post.node.relationships.field_image.alt} height={post.node.relationships.field_image.width}/> : <img src="https://www.agiliacenter.com/wp-content/uploads/2017/02/drupal-cms.png" />}
              </div>
              <div className="col-12 col-md-6 text-left">
                <div dangerouslySetInnerHTML={{ __html: post.node.body.summary}}></div><br></br>
                <div align="right"> <Link to={post.node.path.alias} className="btn btn-outline-primary">Read more</Link></div><br></br>
              </div>
            </div>
          </div>


        )
      );

      const noticialist=
        <Carousel>
          {data.allNodeNoticia.edges.map(notice =>(
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={myurl + notice.node.relationships.field_imagen.uri.url}
                  alt={notice.node.relationships.field_imagen.alt}
                />
                <Carousel.Caption>
                  <h2>{notice.node.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: notice.node.body.summary}}></div>
                </Carousel.Caption>
              </Carousel.Item>
            )
          )}
        </Carousel>

      return <section >{head}{noticialist}{articuloList}</section>;
    }}
  />)

export default Contenido
