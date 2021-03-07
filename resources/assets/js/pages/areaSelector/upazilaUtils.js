/**
 * Created by Rajesh on 9/17/19.
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import posed from "react-pose";
import { bindActionCreators } from "redux";

import { setUpazliaLocation } from "../../actions/locationActions";
import { districts } from "../../maps";
import {
  fetchProfileData,
  fetchPipilikaNewsData,
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
  },
  to: { staggerChildren: 10 },
});

const pathProperty = {
  from: {
    opacity: 1,
    cursor: "pointer",
    strokeWidth: 0.2,
  },
  to: {
    fill: "#34db93",
  },
  selected: {
    fill: "#22965c",
  },
  hoverable: true,
  hover: {
    fill: "#22965c",
  },
};
const Path = posed.path(pathProperty);
const Polygon = posed.polygon(pathProperty);

const calculateCenter = function (elem) {
  let bbox = elem.getBBox();

  let cx = bbox.x + bbox.width / 2;
  let cy = bbox.y + bbox.height / 2;

  return { x: cx, y: cy };
};

const getChildPositions = function (elem) {
  const children = elem.childNodes;
  let dist = {};

  Object.keys(children).map((child) => {
    if (children[child].attributes["alt"]) {
      const districtName = children[child].attributes["alt"].value;
      dist[districtName] = calculateCenter(children[child]);
    }
  });

  return dist;
};

class DistrictComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      upazilaList: null,
    };
    this.onUpazilaClick = this.onUpazilaClick.bind(this);
    this.updateResultData = this.updateResultData.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    if (this.state.upazilaList == null) {
      const node = ReactDOM.findDOMNode(this);
      const upazlias = getChildPositions(node);
      this.setState({
        upazilaList: upazlias,
      });
    }
  }

  updateResultData(location, type) {
    const {
      fetchProfileData,
      fetchNewsData,
      fetchPipilikaNewsData,
      fetchPlacesData,
      fetchHotelData,
      fetchMarketplaceData,
      fetchInstituteData,
      fetchNoticeData,
      resetResultData,
    } = this.props;

    resetResultData();
    // fetchProfileData(location,type);

    const departed = this.props.query.split(", ");

    var district = departed[1];
    if (district === undefined) {
      district = departed[0].split(" ")[0];
    }
    console.log(district);
    fetchPipilikaNewsData(district + " " + location, type);
    window.scrollTo(0, 0);
    // fetchHotelData(location, type);
    // fetchMarketplaceData(location, type);
    // fetchInstituteData(location, type);
    // fetchNoticeData(location, type);
    // fetchPlacesData(location, type);
  }

  onUpazilaClick(event) {
    const { onUpazilaSelect } = this.props;
    let cx, cy;

    const targetElem = event.target;
    const svgElem = targetElem.parentElement.parentElement;

    let targetCenter = calculateCenter(targetElem);
    let parentCenter = calculateCenter(svgElem);

    cx = targetCenter.x - parentCenter.x;
    cy = targetCenter.y - parentCenter.y;

    const bengaliName = targetElem.getAttribute("alt");
    this.props.setUpazliaLocation(bengaliName);

    this.updateResultData(bengaliName.replace("-", " "), "upazila");

    if (onUpazilaSelect) onUpazilaSelect(cx, cy);
  }

  render() {
    const { mounted, upazilaList } = this.state;
    const { selectedUpazila } = this.props;

    let { district } = this.props;

    if (!district) district = districts["sylhet"];

    const upazilas = district.locations.map((upa, idx) => {
      const currentPose = upa.bengali == selectedUpazila ? "selected" : "to";
      if (upa.type == "polygon") {
        return (
          <Polygon
            pose={currentPose}
            key={"upa_" + idx}
            dur={2000}
            points={upa.path}
            id={upa.id}
            area={upa.area}
            name={upa.name}
            alt={upa.bengali}
            onClick={this.onUpazilaClick}
          />
        );
      }

      return (
        <Path
          pose={currentPose}
          key={"upa_" + idx}
          dur={2000}
          d={upa.path}
          id={upa.id}
          area={upa.area}
          name={upa.name}
          alt={upa.bengali}
          onClick={this.onUpazilaClick}
        />
      );
    });

    return (
      <G pose={mounted ? "to" : "from"}>
        {upazilas}
        {upazilaList && <UpazliaTitle upazliaList={upazilaList} />}
      </G>
    );
  }
}

const TextGroup = posed.g({});
const Text = posed.text({});

class UpazliaTitle extends Component {
  render() {
    const { upazliaList } = this.props;
    const textComponents = Object.keys(upazliaList).map((divId, idx) => {
      const current = upazliaList[divId];
      return (
        <Text
          x={current.x}
          y={current.y}
          fontSize="5px"
          strokeWidth="0"
          stroke="#5f5f5f"
          key={"upa_text_" + idx}
        >
          {divId}
        </Text>
      );
    });

    return <TextGroup>{textComponents}</TextGroup>;
  }
}

function mapStateToProps(store) {
  return {
    ...store.locations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUpazliaLocation,
      fetchProfileData,
      fetchPipilikaNewsData,
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

export default connect(mapStateToProps, mapDispatchToProps)(DistrictComponent);
