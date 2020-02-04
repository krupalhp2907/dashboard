import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              {/* <NavLink tag={Link} to={item.to}>
                {item.title}
              </NavLink> */}
              <a href={item.to} className="px-2">
                {item.title}
              </a>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2020 Odinub.com",
  menuItems: [
    {
      title: "Home",
      to: "https://www.odinub.com/"
    },
    {
      title: "About",
      to: "https://www.odinub.com/"
    },
    {
      title: "Products",
      to: "https://www.odinub.com/Odinub-Product"
    },
    {
      title: "Blog",
      to: "https://community.odinub.com/"
    }
  ]
};

export default MainFooter;
