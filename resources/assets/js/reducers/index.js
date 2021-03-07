/**
 * Created by Rajesh on 11/13/18.
 */

import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';
import locations from './locations';
import results from './results';

export default combineReducers({
    locations,
    results,
    routing: routerReducer
});
