/**
 * Created by Rajesh on 11/26/18.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "../../store";

import AreaSelector from "../areaSelector";
import AreaNavigation from "../areaSelector/navigation";
import Results from "../results";
import DetailedResult from "../results/detailedResult";
import Footer from "../../utils";

const styles = theme => ({
  rootContainer: {
    maxWidth: 1680
  },
  svgContainer: {
    overflow: "hidden",
    minHeight: 750,
    margin: theme.spacing(2, 0)
  },
  hideOverflow: {
    overflow: "hidden"
  },
  disableClick: {
    pointerEvents: "none"
  }
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailedResult: true
    };
    // this.onResetQuery = this.onResetQuery.bind(this);
  }

  // onResetQuery(){
  //     this.setState({
  //         showDetailedResult: false
  //     });
  // }

  render() {
    const { classes } = this.props;
    const fetching =
      this.props.fetchingProfiles ||
      this.props.fetchingNews ||
      this.props.fetchingMarketplaces ||
      this.props.fetchingHotels ||
      this.props.fetchingInstitutes ||
      this.props.fetchingNotices ||
      this.props.fetchingPlaces;
    return (
      <React.Fragment>
        <Container
          fixed
          className={classes.rootContainer}
          style={{ marginTop: "5rem" }}
        >
          <Grid container spacing={4}>
            <Grid
              item
              sm={6}
              xs={12}
              className={
                fetching
                  ? `${classes.hideOverflow} ${classes.disableClick}`
                  : classes.hideOverflow
              }
            >
              <div>
                <div
                  style={{ position: "fixed", width: "40vw", height: "40vh" }}
                >
                  <p>*জেলা উপজেলা সমূহের তথ্য জানতে চাইলে ক্লিক করুন সংশ্লিষ্ট জেলা কিংবা উপজেলার উপর</p>
                  <AreaNavigation
                  // onResetQuery={this.onResetQuery}
                  />
                  <AreaSelector />
                </div>
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Router>
                <Switch>
                  <Route exact path="/" component={Results} />
                  <Route path="/:type" component={DetailedResult} />
                </Switch>
              </Router>
            </Grid>
          </Grid>
        </Container>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    fetchingProfiles: store.results.profiles.fetching,
    fetchingNews: store.results.news.fetching,
    fetchingMarketplaces: store.results.marketplaces.fetching,
    fetchingHotels: store.results.hotels.fetching,
    fetchingInstitutes: store.results.institutes.fetching,
    fetchingNotices: store.results.notices.fetching,
    fetchingPlaces: store.results.places.fetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Landing));
