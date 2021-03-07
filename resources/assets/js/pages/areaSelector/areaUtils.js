/**
 * Created by Rajesh on 9/8/19.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import posed from "react-pose";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";

import {
  setDivisionLocation,
  clearDivisionLocation,
  setDistrictLocation,
} from "../../actions/locationActions";
import {
  fetchProfileData,
  fetchNewsData,
  fetchPlacesData,
  fetchHotelData,
  fetchMarketplaceData,
  fetchInstituteData,
  fetchNoticeData,
  resetResultData,
} from "../../actions/searchActions";

const G = posed.g({
  from: {
    stroke: "#ffffff",
    cursor: "pointer",
  },
  to: { staggerChildren: 10 },
});

const pathProperty = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  default: {
    fill: "#cccccc",
  },
  hovered: {
    fill: "#68f2b6",
  },
  selected: {
    fill: "#68f2b6",
  },
};

const hoverPathProperty = {
  ...pathProperty,
  hoverable: true,
  init: {
    fill: "#77dd8f",
  },
  hover: {
    fill: "#0eb57a",
  },
};

const Path = posed.path(pathProperty);
const Polygon = posed.polygon(pathProperty);

const HoverPath = posed.path(hoverPathProperty);
const HoverPoly = posed.polygon(hoverPathProperty);

const DangerPath = (count) => {
  const DangerPathProperty = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    default: {
      fill: "rgba(255,0,0," + count + ")",
    },
    hovered: {
      fill: "rgba(255,0,0,0.5 )",
    },
    selected: {
      fill: "rgb(255, 216, 216)",
    },
  };
  return posed.path(DangerPathProperty);
};
const DangerPolygon = (count) => {
  const DangerPathProperty = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    default: {
      fill: "rgba(200,200,200)",
      fill: "rgba(255,0,0," + count + ")",
    },
    hovered: {
      fill: "rgba(255,0,0,0.5 )",
    },
    selected: {
      fill: "rgb(255, 216, 216)",
    },
  };
  return posed.polygon(DangerPathProperty);
};

const DangerHoverPath = (count) => {
  const DangerPathProperty = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    default: {
      fill: "rgba(200,200,200)",
      fill: "rgba(255,0,0," + count + ")",
    },
    hovered: {
      fill: "rgba(255,0,0,0.5 )",
    },
    selected: {
      fill: "rgba(255,0,0," + (+count + 0.2) + ")",
    },
  };
  const DangerHoverPathProperty = {
    ...DangerPathProperty,
    hoverable: true,
    init: {
      fill: "rgba(255,0,0," + (+count + 0.2) + ")",
    },
    hover: {
      fill: "rgba(255,0,0," + 0.8 + ")",
    },
  };
  return posed.path(DangerHoverPathProperty);
};
const DangerHoverPolygon = (count) => {
  const DangerPathProperty = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    default: {
      fill: "rgba(200,200,200)",
      fill: "rgba(255,0,0," + count + ")",
    },
    hovered: {
      fill: "rgba(255,0,0,0.5 )",
    },
    selected: {
      fill: "rgba(255,0,0," + (+count + 0.2) + ")",
    },
  };
  const DangerHoverPathProperty = {
    ...DangerPathProperty,
    hoverable: true,
    init: {
      fill: "rgba(255,0,0," + (+count + 0.2) + ")",
    },
    hover: {
      fill: "rgba(255,0,0," + 0.8 + ")",
    },
  };
  return posed.polygon(DangerHoverPathProperty);
};

const calculateCenter = function (elem) {
  let bbox = elem.getBBox();

  let cx = bbox.x + bbox.width / 2;
  let cy = bbox.y + bbox.height / 2;

  return { x: cx, y: cy };
};

class DivisionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      selected: false,
      newsCount: {},
    };

    this.onDivisionClick = this.onDivisionClick.bind(this);
    this.onMouseHover = this.onMouseHover.bind(this);
    this.onDistrictClick = this.onDistrictClick.bind(this);
    this.updateResultData = this.updateResultData.bind(this);
  }

  componentDidMount() {
    const {
      fetchProfileData,
      fetchNewsData,
      fetchPlacesData,
      fetchHotelData,
      fetchMarketplaceData,
      fetchInstituteData,
      fetchNoticeData,
      resetResultData,
    } = this.props;

    resetResultData();
    fetchNewsData("", "");
    window.scrollTo(0, 0);
    var self = this;
  }

  componentDidUpdate(prevProps) {
    const { selectedDivision, name } = this.props;

    if (this.state.selected && selectedDivision !== name) {
      this.setState({
        selected: false,
        hovered: false,
      });
    }
  }

  onMouseHover(onHover) {
    if (this.props.selectedDivision.length == 0) {
      this.setState({
        hovered: onHover,
      });
    }
  }

  getChildPositions(elem) {
    const children = elem.childNodes;
    let dist = {};

    Object.keys(children).map((child, idx) => {
      const districtName = children[child].attributes["alt"].value;
      dist[districtName] = calculateCenter(children[child]);
    });

    return dist;
  }

  updateResultData(location, type) {
    const {
      fetchProfileData,
      fetchNewsData,
      fetchPlacesData,
      fetchHotelData,
      fetchMarketplaceData,
      fetchInstituteData,
      fetchNoticeData,
      resetResultData,
    } = this.props;
    resetResultData();
    // fetchProfileData(location,type);
    fetchNewsData(location, type);
    window.scrollTo(0, 0);
    // fetchMarketplaceData(location, type);
    // fetchHotelData(location, type);
    // fetchInstituteData(location, type);
    // fetchNoticeData(location, type);
    // fetchPlacesData(location, type);
  }

  onDivisionClick(event) {
    const {
      name,
      selectedDivision,
      setDivisionLocation,
      history,
      onClick,
    } = this.props;
    let cx, cy;

    if (selectedDivision.length == 0) {
      const targetElem = event.target.parentElement;
      const svgElem = targetElem.parentElement;

      let targetCenter = calculateCenter(targetElem);
      let parentCenter = calculateCenter(svgElem);

      const districtList = this.getChildPositions(targetElem);

      cx = targetCenter.x - parentCenter.x;
      cy = targetCenter.y - parentCenter.y;

      setDivisionLocation(name);
      this.updateResultData(name, "division");
      //history.push('search?loc=' + name + '&area=division');

      this.setState({ selected: true });

      if (onClick) onClick(cx, cy, districtList);
    }
  }

  onDistrictClick(event) {
    const {
      selectedDivision,
      currentStep,
      name,
      setDistrictLocation,
      fetchProfileData,
      onDistrictSelect,
    } = this.props;
    let cx, cy;

    if (
      selectedDivision.length > 0 &&
      name == selectedDivision &&
      currentStep == "primary"
    ) {
      const targetElem = event.target;
      const svgElem = targetElem.parentElement.parentElement;

      let targetCenter = calculateCenter(targetElem);
      let parentCenter = calculateCenter(svgElem);

      cx = targetCenter.x - parentCenter.x;
      cy = targetCenter.y - parentCenter.y;

      const selectedDis = targetElem.getAttribute("name");
      const bengali = targetElem.getAttribute("alt");

      setDistrictLocation(selectedDis, bengali);
      this.updateResultData(bengali.replace("-", " "), "district");

      if (onDistrictSelect) onDistrictSelect(cx, cy);
    }
  }

  render() {
    const { selectedDivision, currentStep, name, division } = this.props;
    const { hovered, selected } = this.state;

    const districts = division.locations.map((dis, idx) => {
      let PathComp;

      if (selectedDivision == name && currentStep == "primary") {
        if (this.state.newsCount["হবিগঞ্জ"] !== undefined) {
          PathComp =
            dis.type == "path"
              ? DangerHoverPath(this.state.newsCount[dis.bengali] / 612)
              : DangerHoverPolygon(this.state.newsCount[dis.bengali] / 612);
        } else {
          PathComp = dis.type == "path" ? HoverPath : HoverPoly;
        }
      } else {
        if (this.state.newsCount["হবিগঞ্জ"] !== undefined) {
          PathComp =
            dis.type == "polygon"
              ? DangerPolygon(this.state.newsCount[dis.bengali] / 612)
              : DangerPath(this.state.newsCount[dis.bengali] / 612);
        } else {
          PathComp = dis.type == "polygon" ? Polygon : Path;
        }
      }

      return (
        <PathComp
          key={"dis_" + idx}
          dur={2000}
          points={dis.type == "path" ? "" : dis.path}
          d={dis.type == "path" ? dis.path : ""}
          id={dis.id}
          area={dis.area}
          name={dis.name}
          alt={dis.bengali}
          onClick={this.onDistrictClick}
        />
      );
    });

    let step = hovered ? "hovered" : "default";

    if (selected) step = "selected";

    return (
      <G
        pose={step}
        onMouseEnter={(e) => this.onMouseHover(true)}
        onMouseLeave={(e) => this.onMouseHover(false)}
        onClick={this.onDivisionClick}
      >
        {districts}
      </G>
    );
  }
}

const TextGroup = posed.g({});

const Text = posed.text({});

class DivisionTitle extends Component {
  render() {
    const { divisionList } = this.props;
    const textComponents = Object.keys(divisionList).map((divId, idx) => {
      const current = divisionList[divId];

      return (
        <Text x={current.centerX} y={current.centerY} key={"div_text_" + idx}>
          {divId}
        </Text>
      );
    });

    return <TextGroup>{textComponents}</TextGroup>;
  }
}

class DistrictTitle extends Component {
  render() {
    const { districtList } = this.props;
    const textComponents = Object.keys(districtList).map((dist, idx) => {
      const current = districtList[dist];
      return (
        <Text
          x={current.x - dist.length * 1.55}
          y={current.y}
          key={"dis_text_" + idx}
          fontSize={9}
        >
          {dist}
        </Text>
      );
    });

    return <TextGroup>{textComponents}</TextGroup>;
  }
}

function mapStateToProps(store) {
  return {
    selectedDivision: store.locations.selectedDivision,
    currentStep: store.locations.currentStep,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDivisionLocation,
      clearDivisionLocation,
      setDistrictLocation,
      fetchProfileData,
      fetchNewsData,
      fetchPlacesData,
      fetchHotelData,
      fetchMarketplaceData,
      fetchInstituteData,
      fetchNoticeData,
      resetResultData,
    },
    dispatch
  );
}

const SmartDivision = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DivisionComponent));

export { SmartDivision, DivisionTitle, DistrictTitle };
