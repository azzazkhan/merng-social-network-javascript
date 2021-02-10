import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    const uri = window.location.pathname;
    const path = uri === "/" ? "home" : uri.substr(1);
    this.state = { activeItem: this.props.active ? this.props.active : path };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary size="large" color="blue">
        <Menu.Item
          name="home"
          as={Link}
          active={activeItem === "home"}
          onClick={this.handleItemClick}
          to="/"
        >
          Home
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            as={Link}
            active={activeItem === "login"}
            onClick={this.handleItemClick}
            to="/login"
          >
            Login
          </Menu.Item>
          <Menu.Item
            name="register"
            as={Link}
            active={activeItem === "join"}
            onClick={this.handleItemClick}
            to="/join"
          >
            Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
