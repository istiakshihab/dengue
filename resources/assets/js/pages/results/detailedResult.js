
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import {CardMedia, Typography, Grid, ListItem, ListItemText, ListItemAvatar, Avatar, Icon} from '@material-ui/core';
import {ResultBlock2, CustomPaper, CustomSlider, CustomListItem, ItemIterator, contentTrimmer, ProfileImage} from './utils';
import {ProfileCard, NewsCard, MarketCard} from './resultItems';

import {clearDivisionLocation, clearDistrictLocation, clearUpazilaLocation, setDetailedResultVisibility} from '../../actions/locationActions';
import {fetchProfileData, fetchNewsData, fetchPlacesData, fetchHotelData, fetchMarketplaceData, fetchInstituteData, fetchNoticeData, resetResultData} from '../../actions/searchActions';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '32px 0 0'
    },
    backButtonClass : {
        float: 'right'
    },
    headingNegativeMargin: {
        marginLeft: '-8px',
        marginBottom: '0'
    },
    media: {
        width: '100%',
        height: '150px'
    },
    placeTitle: {
        marginTop: '10px'
    },
    itemDescriptioin: {
        display: 'block',
        marginTop: '10px'
    },
    noImage: {
        width: '80px',
        height: '80px',
        marginTop: '35px',
        marginBottom: '35px',
    }
});

class DetailedReuslt extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            type: '',
            profiles:false,
            news:false,
            places: false,
            hotels:false,
            markets:false,
            institutes:false,
            notices:false,

        };
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({
            type: this.props.match.params.type,
            [this.props.match.params.type] : true
        });
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.showDetailedResult){
            this.props.history.push('/');
        }
    }

    handleBackClick = () => {
        this.props.history.push('/');
    }

    handleMoreButtonClick = () => {
        const {location_name, location_type, fetchProfileData, fetchNewsData, fetchPlacesData, fetchHotelData, fetchMarketplaceData, fetchInstituteData, fetchNoticeData} = this.props;
        const {type, page} = this.state;

        switch (type) {
            case "profiles":
                fetchProfileData(location_name,location_type, page+1);
                break;
            case "news":
                fetchNewsData(location_name,location_type, page+1);
                break;
            case "places":
                fetchPlacesData(location_name,location_type, page+1);
                break;
            case "hotels":
                fetchHotelData(location_name,location_type, page+1);
                break;
            case "markets":
                fetchMarketplaceData(location_name,location_type, page+1);
                break;
            case "institutes":
                fetchInstituteData(location_name,location_type, page+1);
                break;
            case "notices":
                fetchNoticeData(location_name,location_type, page+1);
        }

        this.setState({
            page: page+1
        });
    }

    renderProfileResults(){
        const {profiles, classes} = this.props;
        const profileCard = (profile, idx) => (
            <ProfileCard key={"profile_" + idx} item={profile}/>
        );

        return(
            <ResultBlock2 result={profiles} title="উল্লেখযোগ্য ব্যক্তিবর্গ" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.profileTotalPages}>
                <Grid container>
                    <ItemIterator itemList={profiles.results} itemFunc={profileCard}/>
                </Grid>
            </ResultBlock2>
        );
    }

    renderNewsResults(){
        const {news, classes} = this.props;

        const newsCard = (item, idx) => (
            <Grid item xs={12} sm={6} className="item-container detailed-result" key={"news" + idx}>
                <CustomPaper 
                    clickUrl={item.url}
                >
                    <React.Fragment>
                    <Typography variant="subtitle2"><strong>{contentTrimmer(item.newsTitle, 50)}</strong></Typography>
                    <Typography variant="caption" className={classes.itemDescriptioin}>{contentTrimmer(item.newsDetails, 70)}</Typography>
                    </React.Fragment>
                </CustomPaper>
            </Grid>
        );

        return(
            <ResultBlock2 result={news} title="সাম্প্রতিক সংবাদ" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.newsTotalPages}>
                <Grid container spacing={2}>
                    <ItemIterator itemList={news.results} itemFunc={newsCard}/>
                </Grid>
            </ResultBlock2>
        );
    }

    renderPlacesResults(){
        const {places, classes} = this.props;

        const placesCard = (item, idx) => (
            <Grid item xs={12} sm={6} className="item-container" key={"places" + idx}>
                <CustomPaper height={260} customClass="noPadding"
                    clickUrl={item.url}
                >
                    <Grid container direction="column"
                        justify="center"
                        alignItems="center">
                        {
                            item.visitPlaceImgUrl !== null ?
                            <CardMedia
                            className={classes.media}
                            image={item.visitPlaceImgUrl}
                            title={item.visitPlaceName}
                                />
                            :
                            <Avatar className={classes.noImage}>
                                <Icon>imageIcon</Icon>
                            </Avatar>
                        }
                        <Typography variant="subtitle1" className={`${classes.titleSingleLine} ${classes.placeTitle}`}><strong>{item.visitPlaceName}</strong></Typography>
                        <Typography variant="body2" component="p" align="center" className="classes.itemDescriptioin"><strong>যেভাবে যাবেন:</strong> {item.visitPlacePath?contentTrimmer(item.visitPlacePath, 80):''}
                        </Typography>
                    </Grid>
                </CustomPaper>
            </Grid>
        );

        return(
            <ResultBlock2 result={places} title="দর্শনীয় স্থানসমূহ" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.placesTotalPages}>
                <Grid container>
                    <ItemIterator itemList={places.results} itemFunc={placesCard}/>
                </Grid>
            </ResultBlock2>
        );
    }


    renderMarketplaceResults(){
        const {marketplaces, classes} = this.props;

        const marketCard = (market, idx) => (
            <MarketCard key={"marketplace_" + idx} item={market}/>
        );

        return(
            <ResultBlock2 result={marketplaces} title="বাজার" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.marketsTotalPages}>
                <Grid container>
                    <ItemIterator itemList={marketplaces.results} itemFunc={marketCard}/>
                </Grid>
            </ResultBlock2>
        );
    }

    renderHotelResults(){
        const {hotels, classes} = this.props;

        const hotelCard = (item, idx) => (
            <Grid item xs={12} sm={6} className="item-container detailed-result" key={"hotels_" + idx}>
                <CustomPaper height={140} clickUrl={item.url}>
                    <Grid container direction="column"
                          justify="center"
                          alignItems="center">
                        <Avatar>
                            <Icon>hotel</Icon>
                        </Avatar>
                        <Typography variant="subtitle1" className={classes.titleSingleLine}>{item.hotelName}</Typography>
                        <Typography variant="caption" color="textSecondary" className={classes.cardSubtitle}>
                            {item.hotelType}
                        </Typography>
                        <Typography variant="body2" component="p" align="center">
                            <span className={classes.contentSingleLine}>{item.hotelAddress}</span><br/>
                            {item.hotelContact ? `যোগাযোগ: ${item.hotelContact}` : ''}
                        </Typography>
                    </Grid>
                </CustomPaper>
            </Grid>
        );

        return(
            <ResultBlock2 result={hotels} title="হোটেল" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.hotelsTotalPages}>
                <Grid container spacing={2}>
                    <ItemIterator itemList={hotels.results} itemFunc={hotelCard}/>
                </Grid>
            </ResultBlock2>
        );
    }

    renderInstituteResults(){
        const {institutes, classes} = this.props;

        const instituteCard = (institute, idx) => (
            <CustomListItem key={"institute_" + idx} clickUrl={institute.url}>
                <ListItemAvatar>
                    <Avatar>
                        <Icon>business</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={institute.instituteName}
                    secondary={institute.instituteType}
                />
            </CustomListItem>
        );

        return(
            <ResultBlock2 result={institutes} title="প্রতিষ্ঠান" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.institutesTotalPages}>
                <Grid container>
                    <ItemIterator itemList={institutes.results} itemFunc={instituteCard}/>
                </Grid>
            </ResultBlock2>
        );
    }

    renderNoticeResults(){
        const {notices, classes} = this.props;

        const noticeCard = (notice, idx) => (
            <CustomListItem key={"notice_" + idx} clickUrl={notice.url}>
                <ListItemAvatar>
                    <Avatar>
                        <Icon>announcement</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant="subtitle1" className={classes.titleSingleLine}>{notice.noticeTitle}</Typography>}
                    secondary={contentTrimmer(notice.noticeContent)}
                />
            </CustomListItem>
        );

        return(
            <ResultBlock2 result={notices} title="নোটিশ" onButtonClick={this.handleMoreButtonClick} onBackButtonClick={this.handleBackClick} currentPage={this.state.page} totalPages={this.props.noticesTotalPages}>
                <Grid container>
                    <ItemIterator itemList={notices.results} itemFunc={noticeCard}/>
                </Grid>
            </ResultBlock2>
        );
    }

    render() {
      const {profiles, news, places, hotels, markets, institutes, notices} = this.state;
      const {query, classes} = this.props;
      
      return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.headingNegativeMargin} gutterBottom>
                        {query}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                {profiles && this.renderProfileResults()}
                {news && this.renderNewsResults()}
                {places && this.renderPlacesResults()}
                {markets && this.renderMarketplaceResults()}
                {hotels && this.renderHotelResults()}
                {institutes && this.renderInstituteResults()}
                {notices && this.renderNoticeResults()}
            </Grid>            
        </div>
      )
    }
}

function mapStateToProps(store) {
    return {
        query: store.locations.query,
        location_name: store.results.location,
        location_type: store.results.type,
        profileTotalPages: store.results.profiles.totalPages,
        newsTotalPages: store.results.news.totalPages,
        placesTotalPages: store.results.places.totalPages,
        marketsTotalPages: store.results.marketplaces.totalPages,
        hotelsTotalPages: store.results.hotels.totalPages,
        institutesTotalPages: store.results.institutes.totalPages,
        noticesTotalPages: store.results.notices.totalPages,
        showDetailedResult: store.locations.showDetailedResult,
        ...store.results
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearDivisionLocation, clearDistrictLocation, clearUpazilaLocation,
        fetchProfileData, fetchNewsData, fetchPlacesData, fetchHotelData, fetchMarketplaceData, fetchInstituteData, fetchNoticeData,
        resetResultData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(DetailedReuslt)));