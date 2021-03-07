/**
 * Created by Rajesh on 9/3/19.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import posed from "react-pose";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import { divisions, districts } from "../../maps";

import { updateCurrentStep } from "../../actions/locationActions";

import { SmartDivision, DivisionTitle, DistrictTitle } from "./areaUtils";
import DistrictComponent from "./upazilaUtils";

const styles = (theme) => ({
  svgContainer: {
    overflow: "hidden",
    minHeight: 700,
    margin: theme.spacing(2, 0),
    marginTop: "10px",
    background: "#ffffff",
    borderRadius: theme.shape.borderRadius * 4.0,
  },
});

const SVG = posed.svg({});

const Wrapper = posed.div({
  enter: {
    scale: 1,
    x: 0,
    y: 0,
  },
  primary: {
    scale: 2,
    x: ({ i }) => {
      return -1 * i * 1.5;
    },
    y: ({ j }) => -1 * j,
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 60,
      damping: 10,
      mass: 0.5,
    },
  },
  final: {
    scale: 5.0,
    x: ({ i }) => {
      return -1 * i * 3;
    },
    y: ({ j }) => -1 * j * 3,
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 60,
      damping: 10,
      mass: 0.5,
    },
  },
});

class AreaSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      offsetX: 0,
      offsetY: 0,
      districtList: {},
    };

    this.resetSteps = this.resetSteps.bind(this);
    this.onDivisionClick = this.onDivisionClick.bind(this);
    this.onDistrictClick = this.onDistrictClick.bind(this);
    this.onUpazilaClick = this.onUpazilaClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  resetSteps(callback = null) {
    this.props.updateCurrentStep("primary");
    this.setState(
      {
        offsetX: 0,
        offsetY: 0,
      },
      () => {
        if (callback) callback();
      }
    );
  }

  onDivisionClick(cx, cy, districtList = {}) {
    this.setState({
      offsetX: cx,
      offsetY: cy,
      districtList: districtList,
    });
  }

  onDistrictClick(cx, cy) {
    const { currentStep, updateCurrentStep } = this.props;

    if (currentStep !== "final") {
      this.setState({
        offsetX: cx,
        offsetY: cy,
      });
      updateCurrentStep("final");
    } else {
      this.setState({
        offsetX: cx,
        offsetY: cy,
      });
      updateCurrentStep("final");
    }
  }

  onUpazilaClick(cx, cy) {
    this.resetSteps(() => {
      this.setState({
        offsetX: cx,
        offsetY: cy,
      });
      this.props.updateCurrentStep("final");
    });
  }

  render() {
    const { mounted, offsetX, offsetY, districtList } = this.state;
    const {
      classes,
      query,
      currentStep,
      selectedDivision,
      selectedDistrict,
    } = this.props;

    let divComponents = Object.keys(divisions).map((divId, idx) => {
      return (
        <SmartDivision
          division={divisions[divId]}
          key={divId}
          name={divId}
          onClick={this.onDivisionClick}
          onDistrictSelect={this.onDistrictClick}
        />
      );
    });

    const Barisal = divisions["বরিশাল"];

    const viewBox = Barisal.viewBox
      ? Barisal.viewBox
      : `0 0 ${Barisal.width} ${Barisal.height}`;

    return (
      <div className={classes.svgContainer}>
        <Wrapper pose={currentStep} i={offsetX} j={offsetY}>
          <SVG
            pose={mounted ? "to" : "from"}
            id="svg7651"
            height="600"
            width="100%"
            viewBox={viewBox}
          >
            {divComponents}
            {selectedDivision.length == 0 && (
              <DivisionTitle divisionList={divisions} />
            )}
            {selectedDivision.length > 0 && currentStep == "primary" && (
              <DistrictTitle districtList={districtList} />
            )}
            {selectedDistrict.length > 0 && (
              <DistrictComponent
                district={districts[selectedDistrict]}
                onUpazilaSelect={this.onUpazilaClick}
              />
            )}
          </SVG>
        </Wrapper>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    ...store.locations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateCurrentStep }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AreaSelector));
