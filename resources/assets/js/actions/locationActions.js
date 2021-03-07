/**
 * Created by Rajesh on 9/11/19.
 */

export function setDivisionLocation(div) {
    return function (dispatch) {
        dispatch({type: "ON_DIVISION_SELECT", payload: div});
        dispatch({type: "ON_SET_LOCATION", payload: {location: div, type:"division"}});
    }
}

export function clearDivisionLocation() {
    return function (dispatch) {
        dispatch({type: "ON_UPAZILA_SELECT", payload: ""});
        dispatch({type: "ON_CLEAR_DISTRICT"});
        dispatch({type: "ON_DIVISION_SELECT", payload: ""});
        dispatch({type: "ON_SET_LOCATION", payload: {location: "", type:""}});
        dispatch({type: "SET_DETAILED_RESULT_VISIBILITY_FALSE"});
    }
}

export function setDistrictLocation(dis, bengali="") {
    return function (dispatch) {
        dispatch({
            type: "ON_DISTRICT_SELECT",
            payload: {
                english: dis,
                bengali: bengali
            }
        });
        dispatch({type: "ON_SET_LOCATION", payload: {location: bengali, type:"district"}});
    }
}

export function clearDistrictLocation() {
    return function (dispatch, getState) {
        const {selectedDivision} = getState().locations;
        dispatch({type: "ON_UPAZILA_SELECT", payload: ""});
        dispatch({type: "ON_CLEAR_DISTRICT"});
        dispatch({type: "ON_SET_LOCATION", payload: {location: selectedDivision, type:"division"}});
    }
}

export function setUpazliaLocation(upa) {
    return function (dispatch) {
        dispatch({type: "ON_UPAZILA_SELECT", payload: upa});
        dispatch({type: "ON_SET_LOCATION", payload: {location: upa, type:"upazila"}});
    }
}

export function clearUpazilaLocation() {
    return function (dispatch, getState) {
        const {bengaliDistrict} = getState().locations;
        dispatch({type: "ON_UPAZILA_SELECT", payload: ""});
        dispatch({type: "ON_SET_LOCATION", payload: {location: bengaliDistrict, type:"district"}});
    }
}

export function updateCurrentStep(step) {
    return function (dispatch) {
        dispatch({type: "ON_CURRENT_STEP_UPDATE", payload: step})
    }
}

export function setDetailedResultVisibility(status){
    return function(dispatch){
        if(status === true){
            dispatch({type: "SET_DETAILED_RESULT_VISIBILITY_TRUE"})
        }else{
            dispatch({type: "SET_DETAILED_RESULT_VISIBILITY_FALSE"})
        }
    }
}