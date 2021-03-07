/**
 * Created by Rajesh on 9/17/19.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import { withStyles } from "@material-ui/core/styles";

import {
  clearDivisionLocation,
  clearDistrictLocation,
  clearUpazilaLocation,
} from "../../actions/locationActions";
import {
  fetchProfileData,
  fetchNewsData,
  fetchPlacesData,
  fetchHotelData,
  fetchMarketplaceData,
  fetchInstituteData,
  fetchNoticeData,
  clearResultData,
  resetResultData,
} from "../../actions/searchActions";

const styles = (theme) => ({
  chipStyles: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
});

class NavigationComponent extends Component {
  constructor(props) {
    super(props);
    this.onDivisionClear = this.onDivisionClear.bind(this);
    this.onDistrictClear = this.onDistrictClear.bind(this);
    this.onUpazilaClear = this.onUpazilaClear.bind(this);
  }

  updateResults(location, type) {
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
    // if(this.props.onResetQuery) this.props.onResetQuery();
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

  onDivisionClear() {
    // if(this.props.onResetQuery) this.props.onResetQuery();
    this.props.clearResultData();
    this.props.clearDivisionLocation();
    this.updateResults("", "");
  }

  onDistrictClear() {
    this.updateResults(this.props.selectedDivision, "division");
    this.props.clearDistrictLocation();
  }

  onUpazilaClear() {
    this.updateResults(this.props.bengaliDistrict, "district");
    this.props.clearUpazilaLocation();
  }

  render() {
    const {
      selectedDivision,
      selectedDistrict,
      bengaliDistrict,
      selectedUpazila,
      classes,
    } = this.props;

    return (
      <Grid container>
        {selectedDivision.length > 0 && (
          <Chip
            label={selectedDivision}
            onDelete={this.onDivisionClear}
            className={classes.chipStyles}
          />
        )}
        {selectedDistrict.length > 0 && (
          <Chip
            label={bengaliDistrict ? bengaliDistrict : selectedDistrict}
            onDelete={this.onDistrictClear}
            className={classes.chipStyles}
          />
        )}
        {selectedUpazila.length > 0 && (
          <Chip
            label={selectedUpazila}
            onDelete={this.onUpazilaClear}
            className={classes.chipStyles}
          />
        )}
      </Grid>
    );
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
      clearDivisionLocation,
      clearDistrictLocation,
      clearUpazilaLocation,
      fetchProfileData,
      fetchNewsData,
      fetchPlacesData,
      fetchHotelData,
      fetchMarketplaceData,
      fetchInstituteData,
      fetchNoticeData,
      clearResultData,
      resetResultData,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(NavigationComponent)));
