/**
 * Created by Rajesh on 9/22/19.
 */

import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import Axios from "axios";
import { importData, importIEDCRData, all5, getRatio } from "./csvLoaders.js";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Icon,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import {
  ResultBlock,
  CustomPaper,
  CustomSlider,
  CustomListItem,
  ItemIterator,
  contentTrimmer,
  ProfileImage,
} from "./utils";
import { ProfileCard, NewsCard, MarketCard } from "./resultItems";
import { pointer } from "popmotion";

import { setDetailedResultVisibility } from "../../actions/locationActions";
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';

const styles = (theme) => ({
  queryTitle: {
    marginTop: "43px",
  },
  titleSingleLine: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "85%",
    overflow: "hidden",
  },
  cardSubtitle: {
    position: "relative",
    top: "-4px",
  },
  contentSingleLine: {
    height: 17,
    overflow: "hidden",
    display: "inline-block",
  },
  media: {
    width: "100%",
    height: "150px",
  },
  moreButtonClass: {
    marginTop: "10px",
    boxShadow: theme.shadows[0],
  },
  linkStyle: {
    cursor: "pointer",
  },
  placeTitle: {
    marginTop: "10px",
  },
  itemDescriptioin: {
    display: "block",
    marginTop: "10px",
  },
  noImage: {
    width: "80px",
    height: "80px",
    marginTop: "35px",
    marginBottom: "35px",
  },
});

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleResult: false,
      isLoading: false,
      hasMore: true,
      page: 1,
      status: {},
      news: [],
      open: false,
    };
    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
  }

  componentDidMount() {}

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleMoreButtonClick(type) {
    this.props.setDetailedResultVisibility(true);
    switch (type) {
      case "profiles":
        this.props.history.push("/profiles");
        break;
      case "news":
        this.props.history.push("/news");
        break;
      case "places":
        this.props.history.push("/places");
        break;
      case "hotels":
        this.props.history.push("/hotels");
        break;
      case "markets":
        this.props.history.push("/markets");
        break;
      case "institutes":
        this.props.history.push("/institutes");
        break;
      case "notices":
        this.props.history.push("/notices");
    }
  }

  timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return this.eBangla(interval) + " বছর";
    } else if (interval === 1) {
      return this.eBangla(interval) + " বছর";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return this.eBangla(interval) + " মাস";
    } else if (interval === 1) {
      return this.eBangla(interval) + " মাস";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return this.eBangla(interval) + " দিন";
    } else if (interval === 1) {
      return this.eBangla(interval) + " দিন";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return this.eBangla(interval) + " ঘণ্টা";
    } else if (interval === 1) {
      return this.eBangla(interval) + " ঘণ্টা";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return this.eBangla(interval) + " মিনিট";
    } else if (interval === 1) {
      return this.eBangla(interval) + " মিনিট";
    }
    return this.eBangla(Math.floor(seconds)) + " সেকেন্ড";
  };

  eBangla = (x) => {
    return x.toLocaleString("bn-BD");
  };

  renderNewsResults = (query) => {
    //get the location name & type ["division", "district", "upazilla"] from passed props
    const { location, type } = this.props;

    var news = this.props.news;

    let labels = [];
    let datum = [];
    let sentence = "";
    let anotherSentence = ""

    let iedcrData = importIEDCRData(query);
    let data2019 = importData(query, 2019);
    let data2020 = importData(query, 2020);
    let data5 = all5(query);


    let ratioData = getRatio()
    let dist = []
    let dil = []
    let inl = []
    let dil2 = []
    let inl2 = []
    for(let i = 0; i< ratioData.length; i++){
      dist[i] = ratioData[i]["District"]
      dil[i] = ratioData[i]["Dis2019"]
      dil2[i] = ratioData[i]["Dis2020"]
      inl[i] = ratioData[i]["Int2019"]
      inl2[i] = ratioData[i]["Int2020"]
    }

    //load more news on overscroll
    const loadMore = () => {
      if (news.results.length >= 500) {
        this.setState({ hasMore: false });
        return;
      }

      var self = this;
      this.setState({ isLoading: true, page: this.state.page + 1 });
      Axios.post(`http://dev.pipilika.com:9191/search/dengue/content`, {
        [type]: location,
        page_no: this.state.page,
      })
        .then(function (response) {
          // console.log("fetched");
          if (response.data.response.data !== undefined) {
            var temp_news = news.results;
            temp_news = [...temp_news, ...response.data.response.data];
            news.results = temp_news;

            self.setState({
              isLoading: false,
            });
          }
        })
        .catch(function (error) {
          self.setState({ isLoading: false, isError: true });
        })
        .finally(function () {
          self.setState({
            isLoading: false,
          });
        });
    };

    if (typeof iedcrData[0] === "string") {
      labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      datum = iedcrData;
      sentence = "২০১৯ সালে সারাদেশের ডেঙ্গু রোগের পরিসংখ্যান আইইডিসিআর মোতাবেক"
      anotherSentence = "IEDCR Data"
    } else {
      labels = iedcrData[0];
      datum = iedcrData[1];
      sentence = "সিলেক্টেড বিভাগ, জেলা অথবা উপজেলার অন্তর্ভুক্ত জেলা, উপজেলা অথবা ইউনিয়নের ২০১৯ সালের নিউজ ফ্রিকোয়েন্সি ডেঙ্গুর ব্যাপারে"
      anotherSentence = "News Data"
    }

    if (query == "") {
      query = "বাংলাদেশ";
    }

    const graphData = {
      type: "bar",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Dengue News Cases for 2020",
          backgroundColor: "rgba(255,99,132,0.5)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.7)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: data2020,
          order: 1,
        },
        {
          type: "bar",
          label: "Dengue News Cases for 2019",
          backgroundColor: "rgba(0, 126, 178,0.2)",
          borderColor: "rgba(0, 126, 178,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0, 126, 178,0.4)",
          hoverBorderColor: "rgba(0, 126, 178,1)",
          data: data2019,
          order: 2,
        },
      ],
      
    };

    const Det2015 = {
      type: "bar",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Dengue News Cases for 2015",
          backgroundColor: "rgba(0, 126, 178,0.2)",
          borderColor: "rgba(0, 126, 178,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0, 126, 178,0.4)",
          hoverBorderColor: "rgba(0, 126, 178,1)",
          data: data5[0],
          order: 1,
        },
      ]
    };

    const Det2016 = {
      type: "bar",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Dengue News Cases for 2016",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: data5[1],
          order: 1,
        },
      ]
    };
    const Det2017 = {
      type: "bar",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Dengue News Cases for 2017",
          backgroundColor: "rgba(0, 126, 178,0.2)",
          borderColor: "rgba(0, 126, 178,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0, 126, 178,0.4)",
          hoverBorderColor: "rgba(0, 126, 178,1)",
          data: data5[2],
          order: 1,
        },
      ]
    };
    const Det2018 = {
      type: "bar",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Dengue News Cases for 2018",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: data5[3],
          order: 1,
        },
      ]
    };

    const Det2019= {
      type: "bar",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Dengue News Cases for 2019",
          backgroundColor: "rgba(0, 126, 178,0.2)",
          borderColor: "rgba(0, 126, 178,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0, 126, 178,0.4)",
          hoverBorderColor: "rgba(0, 126, 178,1)",
          data: data5[4],
          order: 1,
        },
      ]
    };

    const graphData2 = {
      labels: labels,
      datasets: [
        {
          label: anotherSentence,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: datum,
        },
      ],
    };

    return (
      <div>
        <div>
          <Dialog
            open={this.state.open}
            TransitionComponent={this.Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth={true}
            maxWidth={'md'}
            contentStyle={{
              width: 1000,
              maxWidth: 'none',
           }}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Dengue Cases for "+query}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              <div>
                <Bar
                    data={Det2019}
                    width={50}
                    height={17}
                    options={{
                      legend:{
                        display: true,
                      },
                      scales: {
                        yAxes: [{
                          id: "y-axis",
                          type: 'logarithmic',
                          ticks: {
                            autoSkip: false,
                            callback: valueCallback,
                       },
                        }
                      ]
                      },
                    }}
                  />
                  <Bar
                    data={Det2018}
                    width={50}
                    height={17}
                    options={{
                      legend:{
                        display: true,
                      },
                      scales: {
                        yAxes: [{
                          id: "y-axis",
                          type: 'logarithmic',
                          ticks: {
                            autoSkip: false,
                            callback: valueCallback,
                       },

                        }
                      ]
                      },
                    }}
                  />
                </div>
                <div>
                <Bar
                    data={Det2017}
                    width={50}
                    height={17}
                    options={{
                      legend:{
                        display: true,
                      },
                    scales: {
                      yAxes: [{
                        id: "y-axis",
                        type: 'logarithmic',
                        ticks: {
                          autoSkip: false,
                          callback: valueCallback,
                        },}
                    ]
                  },
                    }}
                  />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/*change plot name */}
          <h2>{query}র ২০১৯ এবং ২০২০ সালের ডেঙ্গু বিষয়ক সংবাদের পরিসংখ্যান </h2>
          <Bar
            data={graphData}
            width={50}
            height={17}
            options={{
              legend:{
                display: true,
              },
              scales: {
                yAxes: [{
                  id: "y-axis",
                  type: 'logarithmic',
                  ticks: {
                    autoSkip: false,
                    callback: valueCallback,
               },
                }
              ]
              },
              plugins:{
                datalabels:{
                  rotation:-65
                }
              }              
            }}
          />
        </div>
        {/* Graph Section Ends */}
        <div style={{ marginTop: "5rem" }}>
          <h2>{sentence}</h2>
          <Bar
            data={graphData2}
            width={50}
            height={17}
            options={{
              legend:{
                display: true,
              },
              scales: {
                yAxes: [{
                  type: 'logarithmic',
                  ticks: {
                    autoSkip: false,
                    callback: valueCallback,
                    },
              }]
              },
            }}
          />
        </div>

        <div style={{ marginTop: "5rem" }}>
          <h2>ডেঙ্গু সম্পর্কিত সাম্প্রতিক সংবাদ</h2>
          <InfiniteScroll
            dataLength={news.results.length}
            next={loadMore}
            hasMore={this.state.hasMore}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {news.results.length > 0 ? (
              <div>
                {news.results.map((news) => (
                  <Card
                    key={news.url}
                    style={{
                      marginLeft: 10,
                      marginBottom: 30,
                      maxWidth: "40vw",
                      boxShadow: "0px 0px 10px #bbbbbb",
                    }}
                  >
                    <CardActionArea
                      href={news.url}
                      target="_blank"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <CardMedia
                        image={
                          news.image_url !== undefined
                            ? news.image_url[0]
                            : "https://www.lcsciences.com/news/wp-content/uploads/CDC-mosquito2.jpg"
                        }
                        style={{ height: 150, width: 200 }}
                        title={news.title}
                      />
                      <CardContent style={{ height: 100, width: 400 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {news.title}
                        </Typography>
                        <Typography gutterBottom component="h6">
                          {this.timeSince(Date.parse(news.update_date)) +
                            " আগে"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
                {this.state.isLoading ? (
                  <LinearProgress variant="query" />
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div />
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  };

  render() {
    const { query, classes } = this.props;
    return (
      <div>

        <Typography
          variant="h3"
          gutterBottom
          className={classes.queryTitle}
          style={{ marginLeft: 10, marginBottom: 10}}
        >
          {query}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
          style={{float: "right", fontWeight: "bold"}}
        >
          বিস্তারিত         
        </Button>
        {this.renderNewsResults(query)}

      </div>
    );
  }
}
function valueCallback(value, index, values) {
  // console.log(value)
  if (value === 0) return "0";
  if (value === 10 ) return "10";
  if (value === 30 ) return "30";
  if (value === 100 ) return "100";
  if (value === 300 ) return "300";
  if (value === 1000 ) return "1K";
  if (value === 3000 ) return "3K";
  if (value === 10000 ) return "10K";
  if (value === 30000 ) return "30K";
  if (value === 100000 ) return "1M";
  if (value === 300000 ) return "3M";
  if (value === 1000000 ) return "10M";
  if (value === 3000000 ) return "30M";
  if (value === 10000000 ) return "100M";
  return null;
}
function afterBuildCallback(chart){
  // console.log(chart);
  chart.ticks=[];
  chart.ticks.push(0);
  chart.ticks.push(10);
  chart.ticks.push(30);
  chart.ticks.push(100);
  chart.ticks.push(300);
  chart.ticks.push(1000);
  chart.ticks.push(3000);
  chart.ticks.push(10000);
  chart.ticks.push(30000);
  chart.ticks.push(100000);
  chart.ticks.push(300000);
  chart.ticks.push(1000000);
  chart.ticks.push(3000000);                
}

function mapStateToProps(store) {
  return {
    query: store.locations.query,
    ...store.results,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDetailedResultVisibility }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Results));
