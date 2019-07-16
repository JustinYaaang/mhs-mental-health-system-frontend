/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";

import Button from "components/CustomButtons/Button.jsx";

class FixedActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show",
      bg_checked: true,
      bgImage: this.props.bgImage
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleFixedClick();
  }
  render() {
    return (
      <div
        className={classnames("fixed-plugin", {
          "rtl-fixed-plugin": this.props.rtlActive
        })}
      >
        <div id="fixedPluginClasses" className={this.props.fixedClasses}>
          <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div>
          <ul className="dropdown-menu">
            <li className="header-title">Actions</li>
            <li className="button-container">
            <div className="button-container">
              <Button
                color="info"
                fullWidth
                href="/"
                target="_blank"
              >
                More Info Required
              </Button>
              </div>
            </li>
            <li className="button-container">
              <div className="button-container">
                <Button
                  color="success"
                  href="/"
                  target="_blank"
                  fullWidth
                >
                  Refer
                </Button>
              </div>
            </li>
            <li className="button-container">
              <div className="button-container">
                <Button
                  color="danger"
                  href="/"
                  target="_blank"
                  fullWidth
                >
                  Close Case
                </Button>
              </div>
            </li>
            
            {/* <li className="adjustments-line" /> */}
          </ul>
        </div>
      </div>
    );
  }
}

FixedActions.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};

export default FixedActions;
