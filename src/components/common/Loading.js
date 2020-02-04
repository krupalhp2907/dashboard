import React from "react";

import { Container } from "shards-react";

const Loading = () => {

  return (
    <Container className="main-content-container px-4 d-flex justify-content-center align-items-center" style={{"width": "100vw", "height": "100vh"}}>
        <div className="spinner-border text-primary" style={{"width": "3rem", "height": "3rem"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Container>
  )
};

export default Loading;
