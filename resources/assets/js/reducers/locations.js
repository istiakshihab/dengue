/**
 * Created by Rajesh on 9/11/19.
 */

const initialState = {
    query: "",
    currentStep: "enter",
    selectedDivision: "",
    selectedDistrict: "",
    bengaliDistrict : "",
    selectedUpazila: "",
    showDetailedResult: true
};

export default function reducer(state=initialState, action) {
    switch(action.type){
        case "ON_DIVISION_SELECT":
            return {
                ...state,
                currentStep: action.payload.length > 0 ? "primary" : "enter",
                selectedDivision: action.payload,
                query: action.payload.length > 0 ? action.payload : ""
            };
        case "ON_DISTRICT_SELECT":
            return {
                ...state,
                currentStep: "final",
                selectedDistrict: action.payload.english,
                bengaliDistrict: action.payload.bengali,
                query: action.payload.bengali + " জেলা"
            };
        case "ON_CLEAR_DISTRICT":
            return {
                ...state,
                currentStep: "primary",
                selectedDistrict: "",
                bengaliDistrict: "",
                query: state.selectedDivision
            };
        case "ON_UPAZILA_SELECT":
            return {
                ...state,
                selectedUpazila: action.payload,
                query: (action.payload.length > 0) ? action.payload + ", " + state.bengaliDistrict: state.bengaliDistrict
            };
        case "ON_CURRENT_STEP_UPDATE":
            return{
                ...state,
                currentStep: action.payload
            };
        case "ON_SET_QUERY":
            return{
                ...state,
                query: action.payload
            };
        case "SET_DETAILED_RESULT_VISIBILITY_TRUE":
            return{
                ...state,
                showDetailedResult: true
            };
        case "SET_DETAILED_RESULT_VISIBILITY_FALSE":
            return{
                ...state,
                showDetailedResult: false
            };
        case "ON_LOCATION_RESET":
            return initialState;
        default:
            return state;
    }
}
