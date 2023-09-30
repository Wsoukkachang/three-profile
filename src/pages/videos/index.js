import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { Box, Grid } from "@chakra-ui/react";

export const Videos = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Videos | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Videos </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <Grid
          // templateColumns="repeat(2, 1fr)"
          responsiveGridColumns={[{ base: "1fr", md: "repeat(2, 1fr)" }]}
          gap={4}
        >
          <Box
            style={{ aspectRatio: 16 / 9, minWidth: "45vw" }}
            as="iframe"
            class="youtube-video"
            src={
              "https://www.youtube.com/embed/8nQg5_Ez2OY?si=bVZrU4T-PCIh05p1"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            borderRadius="10px"
            boxShadow="lg"
            margin="auto"
          />

          <Box
            style={{ aspectRatio: 16 / 9, minWidth: "45vw" }}
            as="iframe"
            class="youtube-video"
            src={
              "https://www.youtube.com/embed/9Rd5nfxKuh8?si=kgn_mfnovAlnONnW"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            borderRadius="10px"
            boxShadow="lg"
            margin="auto"
          />

          <Box
            style={{ aspectRatio: 16 / 9, minWidth: "45vw" }}
            as="iframe"
            class="youtube-video"
            src={
              "https://www.youtube.com/embed/aGT5J5f-4WI?si=k2ruVkV_XrBs6Xjw"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            borderRadius="10px"
            boxShadow="lg"
            margin="auto"
          />

          <Box
            style={{ aspectRatio: 16 / 9, minWidth: "45vw" }}
            as="iframe"
            class="youtube-video"
            src={
              "https://www.youtube.com/embed/c51sk7V8Orc?si=W8jNkf2jLpC4RaOl"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            borderRadius="10px"
            boxShadow="lg"
            margin="auto"
          />
        </Grid>
      </Container>
    </HelmetProvider>
  );
};
