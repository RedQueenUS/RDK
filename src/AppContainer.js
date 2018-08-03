import { connect } from "react-redux";
import AppComponent from "./App";

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
