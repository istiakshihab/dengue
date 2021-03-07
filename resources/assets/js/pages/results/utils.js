/**
 * Created by Rajesh on 9/24/19.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import {
  Typography,
  CircularProgress,
  Grid,
  Paper,
  ListItem,
  Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CachedIcon from "@material-ui/icons/Cached";

const styles = theme => ({
  resultContainer: {
    margin: theme.spacing(2, 0),
    marginBottom: "40px"
  },
  loaderContainer: {
    minHeight: 180
  },
  loaderContainer2: {
    minHeight: "auto"
  },
  newsCard: {
    borderRadius: theme.shape.borderRadius * 4.0,
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2),
    minHeight: 120,
    outline: "none",
    overflow: "hidden",
    cursor: "pointer"
  },
  customListItem: {
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(221,221,221,1) 0%, rgba(255,255,255,1) 75%)",
    borderRadius: theme.shape.borderRadius * 4.0,
    margin: theme.spacing(1),
    cursor: "pointer"
  },
  resultBlockMargin: {
    marginBottom: "20px"
  },
  moreButtonWrapper: {
    display: "block",
    width: "100%",
    textAlign: "center",
    marginTop: "25px"
  },
  moreButtonClass: {
    cursor: "pointer",
    padding: "5px",
    marginLeft: "20px",
    boxShadow: theme.shadows[0],
    fontSize: "14px",
    background: "transparent",
    color: "#3f51b5",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  moreButtonClass2: {
    padding: "5px 10px 3px",
    boxShadow: theme.shadows[0]
  },
  buttonIcon: {
    top: "7px",
    position: "relative"
  },
  smallIcon: {
    fontSize: "1rem",
    position: "relative",
    top: "-2px",
    marginLeft: "5px"
  },
  ArrowBack: {
    marginRight: "10px",
    cursor: "pointer",
    padding: "5px",
    position: "relative",
    top: "8px"
  },
  hideButton: {
    display: "none"
  }
});

class ResultContainer extends Component {
  render() {
    const { classes, children, result, title } = this.props;

    if (result.fetching) {
      return (
        <div className={classes.resultContainer}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.loaderContainer}
          >
            <CircularProgress />
          </Grid>
        </div>
      );
    } else if (result.results.length == 0) {
      return <div></div>;
    } else {
      return (
        <div className={classes.resultContainer}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            {this.props.onBackButtonClick ? (
              <ArrowBack
                onClick={() => this.props.onBackButtonClick()}
                className={classes.ArrowBack}
                color="primary"
              />
            ) : (
              ""
            )}

            {title}
          </Typography>

          {children}
        </div>
      );
    }
  }
}

ResultContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired
};

const ResultBlock = withStyles(styles)(ResultContainer);

class ResultContainer2 extends Component {
  render() {
    const {
      classes,
      children,
      result,
      title,
      totalPages,
      currentPage
    } = this.props;

    return (
      <div className={classes.resultContainer}>
        <Typography variant="h5" gutterBottom>
          {this.props.onBackButtonClick ? (
            <ArrowBack
              onClick={() => this.props.onBackButtonClick()}
              className={classes.ArrowBack}
              color="primary"
            />
          ) : (
            ""
          )}

          {title}
        </Typography>

        {children}

        {result.fetching ? (
          <div className={classes.resultContainer}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.loaderContainer2}
            >
              <CircularProgress size={25} />
            </Grid>
          </div>
        ) : currentPage == totalPages - 1 ? (
          ""
        ) : (
          <div className={classes.moreButtonWrapper}>
            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={() => this.props.onButtonClick()}
              className={classes.moreButtonClass2}
            >
              আরো লোড করুন
              <CachedIcon className={classes.smallIcon} />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

ResultContainer2.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired
};

const ResultBlock2 = withStyles(styles)(ResultContainer2);

class CustomPaperClass extends Component {
  render() {
    const { classes, children, height, customClass } = this.props;

    return (
      <Paper
        elevation={4}
        className={`${classes.newsCard} ${customClass}`}
        style={{ height: height }}
        onClick={() =>
          this.props.clickUrl
            ? window.open(this.props.clickUrl, "_blank")
            : console.log("Null")
        }
      >
        {children}
      </Paper>
    );
  }
}

CustomPaperClass.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  height: PropTypes.number
};

CustomPaperClass.defaultProps = {
  height: 120,
  customClass: "defaultClass"
};

const CustomPaper = withStyles(styles)(CustomPaperClass);

const CustomListItemClass = props => (
  <ListItem
    className={props.classes.customListItem}
    onClick={() =>
      props.clickUrl
        ? window.open(props.clickUrl, "_blank")
        : console.log("Null")
    }
  >
    {props.children}
  </ListItem>
);

const CustomListItem = withStyles(styles)(CustomListItemClass);

class CustomSlider extends Component {
  render() {
    const {
      itemFunc,
      itemList,
      limit,
      slidesToShow,
      slidesToScroll
    } = this.props;

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToScroll,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    const itemComponents = itemList
      .filter((item, idx) => {
        if (idx < limit) return item;
      })
      .map((item, idx) => {
        return itemFunc(item, idx);
      });

    return <Slider {...settings}>{itemComponents}</Slider>;
  }
}

CustomSlider.propTypes = {
  itemList: PropTypes.array.isRequired,
  itemFunc: PropTypes.func.isRequired,
  slidesToShow: PropTypes.number,
  limit: PropTypes.number
};

CustomSlider.defaultProps = {
  limit: 6,
  slidesToShow: 3,
  slidesToScroll: 3
};

class ItemIterator extends Component {
  render() {
    const { itemList, itemFunc, limit } = this.props;

    const itemComponents = limit
      ? itemList
          .filter((item, idx) => {
            if (idx < limit) return item;
          })
          .map((item, idx) => {
            return itemFunc(item, idx);
          })
      : itemList.map((item, idx) => {
          return itemFunc(item, idx);
        });

    return <React.Fragment>{itemComponents}</React.Fragment>;
  }
}

ItemIterator.propTypes = {
  itemList: PropTypes.array.isRequired,
  itemFunc: PropTypes.func.isRequired,
  limit: PropTypes.number
};

PropTypes.defaultProps = {
  limit: 6
};

const contentTrimmer = (content, limit = 150) => {
  if (content.length > limit) {
    return content.substr(0, limit) + "...";
  }
  return content;
};

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      src: null
    };
  }

  componentDidMount() {
    this.setState({
      url: this.props.url
    });
  }

  render() {
    return (
      <Avatar>
        <img
          src={this.state.url}
          alt={this.props.alt}
          style={{ width: "100%", height: "auto" }}
          onError={() => this.setState({ url: "/img/profile.png" })}
        />
      </Avatar>
    );
  }
}

export {
  ResultBlock,
  ResultBlock2,
  CustomPaper,
  CustomSlider,
  CustomListItem,
  ItemIterator,
  contentTrimmer,
  ProfileImage
};
