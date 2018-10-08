import React, { Component } from "react";
import Routes from "./routes";

export const RUNE_ID = "12341234-1234-1234-1234-123412341234";

class Rune extends Component {
    render() {
        return (
            <div className="rune landscape">
                <Routes />
            </div>
        )
    }
}

export default Rune;
