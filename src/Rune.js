import React, { Component } from "react";
import PropTypes from "prop-types";
import Routes from "./routes";

import "./Rune.css";

class Rune extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className="Rune">
                <Routes />
            </div>
        )
    }
}

export default Rune;
