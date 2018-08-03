import { connect } from "react-redux";
import Rune from "./Rune";

const mapStateToProps = (state) => {
    return {
        ...state,
        fish: "swim"
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Rune);
