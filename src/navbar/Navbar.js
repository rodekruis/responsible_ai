import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side_menu: "",
        };
    }

    toggle_side_menu = () => {
        this.setState({
            side_menu: this.state.side_menu ? "" : " is-active",
        });
    };

    render() {
        return (
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://www.510.global/">
                        <img
                            src="510-logo.png"
                            alt="www.510.global"
                            width="74"
                            height="24.75"
                        />
                    </a>

                    <span
                        role="button"
                        className={
                            "navbar-burger burger" + this.state.side_menu
                        }
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="side-menu"
                        onClick={this.toggle_side_menu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>

                <div
                    id="side-menu"
                    className={"navbar-menu" + this.state.side_menu}
                >
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <span className="navbar-link">
                                Responsible A.I.
                            </span>

                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to="/">
                                    The Need for Responsible A.I.
                                </Link>
                                <Link className="navbar-item" to="/fact">
                                    Calculate F.A.C.T. Score
                                </Link>
                                <Link className="navbar-item" to="/glossary">
                                    Glossary
                                </Link>
                                <hr className="navbar-divider" />
                                <Link className="navbar-item" to="/feedback">
                                    Feedback
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
