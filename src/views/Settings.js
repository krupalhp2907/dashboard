import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect,
  Container,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

const TopReferrals = ({ title, referralData }) => (
  <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Settings" subtitle="Dashboard" className="text-sm-left mb-3" />
      </Row>
        <Row>
            <Col sm={{ size: 10, order: 1, offset: 1 }}>
            <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup small flush className="list-group-small">
      <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">Logout</span>
            <Button className="ml-auto text-right text-semibold btn btn-danger">
              Logout
            </Button>
        </ListGroupItem>
      </ListGroup>
      <ListGroup small flush className="list-group-small">
      <ListGroupItem className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">Add Permissions</span>
            <Button className="ml-auto text-right text-semibold btn btn-primary">
              Add
            </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>

    {/* <CardFooter className="border-top">
      <Row> */}
        {/* Time Span */}
        {/* <Col>
          <FormSelect
            size="sm"
            value="last-week"
            style={{ maxWidth: "130px" }}
            onChange={() => {}}
          >
            <option value="last-week">Last Week</option>
            <option value="today">Today</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </FormSelect>
        </Col>

        <Col className="text-right view-report">
          <a href="#">Full report &rarr;</a>
        </Col> */}
      {/* </Row>
    </CardFooter> */}
  </Card>
            </Col>
        </Row>
        </Container>

);

TopReferrals.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

TopReferrals.defaultProps = {
  title: "Top Referrals",
  referralData: [
    {
      title: "GitHub",
      value: "19,291"
    },
    {
      title: "Stack Overflow",
      value: "11,201"
    },
    {
      title: "Hacker News",
      value: "9,291"
    },
    {
      title: "Reddit",
      value: "8,281"
    }
  ]
};

export default TopReferrals;
