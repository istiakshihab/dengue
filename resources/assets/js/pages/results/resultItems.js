/**
 * Created by Rajesh on 9/30/19.
 */

import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import {Typography, Grid, ListItem, ListItemText, ListItemAvatar, Avatar, Icon} from '@material-ui/core';

import {ResultBlock, CustomPaper, CustomSlider, CustomListItem, ItemIterator, contentTrimmer, ProfileImage} from './utils';

const linkStyle = {
    cursor: 'pointer',
};

const blockElement = {
    display: 'block',
};

const ProfileCard = (props) => (
    <Grid item xs={6}>
        <ListItem alignItems="flex-start" style={linkStyle} onClick={()=>window.open(props.item.url,'_blank')}>
            <ListItemAvatar>
                <ProfileImage alt={props.item.personName} url={props.item.personImage} />
            </ListItemAvatar>
            <ListItemText
                primary={props.item.personName}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {props.item.personDesignation}
                    </Typography>
                    {props.item.personEmail ? <Typography component="span" variant="caption" color="textSecondary"
                    style={blockElement}><strong>ইমেইল: </strong>{props.item.personEmail}</Typography>
                     :''}
                    {props.item.personContact ? <Typography component="span" variant="caption" color="textSecondary"
                    style={blockElement}><strong>মোবাইল: </strong>{props.item.personContact}</Typography>
                     :''}

                  </React.Fragment>
                }
            />
        </ListItem>
    </Grid>
);

const NewsCard = (props) => (
    <CustomPaper style={linkStyle}>
        <Typography variant="subtitle2">{contentTrimmer(props.item.newsTitle, 60)}</Typography>
    </CustomPaper>
);

const MarketCard = (props) => (
    <CustomListItem style={linkStyle} clickUrl={props.item.url}>
        <ListItemAvatar>
            <Avatar>
                <Icon>storefront</Icon>
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={props.item.marketPlaceName}
            secondary={props.item.marketPlaceAddress}
        />
    </CustomListItem>
);

export {ProfileCard, NewsCard, MarketCard};
