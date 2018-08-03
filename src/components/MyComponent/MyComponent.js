import React from "react";
import PropTypes from "prop-types";

const MyComponent = (props) => {
    const {clicks, onClickLeft, onClickRight} = props;
    const {left, right} = clicks;
    return (
        <div>
            <h1>Congratulations!</h1>
            <h2>This is a brand new Rune!</h2>
            <div>
                <div>
                    <button onClick={onClickLeft}>Left Button</button>
                    <label>Click Count: {left}</label>
                </div>
                <div>
                    <button onClick={onClickRight}>Right Button</button>
                    <label>Click Count: {right}</label>
                </div>
            </div>
        </div>
    );
};


MyComponent.prototype.propTypes = {
    clicks: PropTypes.object,
    onClickLeft: PropTypes.func,
    onClickRight: PropTypes.func,
};

export default MyComponent;
