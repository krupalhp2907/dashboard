import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import {withRouter} from "react-router-dom"

const EmployeeDetails = ({ userDetails, id }) => (
  <Card small className="mb-4 pt-3" >
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails[id].avatar}
          alt={userDetails[id].name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails[id].name}</h4>
      <span className="text-muted d-block mb-2">{userDetails[id].jobTitle}</span>
      <Button outline size="sm" className="mx-1 mb-2 btn btn-success btn-outline-success btn-sm btn-pill">
        <i className="material-icons mr-1">person_add</i> Mark Attendance
      </Button>
      <Button outline size="sm" className="mx-1 mb-2 btn btn-info btn-outline-info btn-sm btn-pill">
        <i className="material-icons mr-1">person_add</i> Edit
      </Button>
      <Button outline size="sm" className="mx-1 mb-2 btn btn-danger btn-outline-danger btn-sm btn-pill">
        <i className="material-icons mr-1">person_add</i> Remove
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            {userDetails[id].performanceReportTitle}
          </strong>
          <Progress
            className="progress-sm"
            value={userDetails[id].performanceReportValue}
          >
            <span className="progress-value">
              {userDetails[id].performanceReportValue}%
            </span>
          </Progress>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails[id].metaTitle}
        </strong>
        <span>{userDetails[id].metaValue}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

EmployeeDetails.propTypes = {
  userDetails: PropTypes.object
};

EmployeeDetails.defaultProps = {
  userDetails: {
        "1" : {
            name: "Ali Kerry",
            avatar: require("./../../images/avatars/0.jpg"),
            jobTitle: "Project Manager",
            performanceReportTitle: "Work completed",
            performanceReportValue: 74,
            metaTitle: "Description",
            metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
        },
        "2" : {
            name: "Clark Angela",
            avatar: require("./../../images/avatars/0.jpg"),
            jobTitle: "Project Manager",
            performanceReportTitle: "Workload",
            performanceReportValue: 65,
            metaTitle: "Description",
            metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
        },
        "3" : {
            name: "Jerry Jerry",
            avatar: require("./../../images/avatars/0.jpg"),
            jobTitle: "Project Manager",
            performanceReportTitle: "Workload",
            performanceReportValue: 82,
            metaTitle: "Description",
            metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
        },
        "4" : {
            id: "4",
            name: "Jerry Kerry",
            avatar: require("./../../images/avatars/0.jpg"),
            jobTitle: "Project Manager",
            performanceReportTitle: "Workload",
            performanceReportValue: 78,
            metaTitle: "Description",
            metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
        },
        "5" : {
            id: "5",
            name: "Ali Clark",
            avatar: require("./../../images/avatars/0.jpg"),
            jobTitle: "Project Manager",
            performanceReportTitle: "Workload",
            performanceReportValue: 87,
            metaTitle: "Description",
            metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
        }
    }
};

export default withRouter((props) => (
    <EmployeeDetails id={props.id} />
  ));
