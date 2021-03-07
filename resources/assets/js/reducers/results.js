/**
 * Created by Rajesh on 9/22/19.
 */

const initialState = {
  location: "",
  type: "",
  profiles: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  },
  news: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  },
  marketplaces: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  },
  hotels: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  },
  institutes: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  },
  notices: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  },
  places: {
    fetching: false,
    fetched: false,
    totalPages: 0,
    results: [],
    error: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ON_PROFILE_FETCH_START":
      return {
        ...state,
        profiles: {
          ...state.profiles,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_PROFILE_FETCH_FULFILLED":
      var tempResults = action.payload.data;
      var finalResult = [...state.profiles.results];
      for (var i = 0; i < tempResults.length; i++) {
        finalResult.push(tempResults[i]);
      }
      return {
        ...state,
        profiles: {
          ...state.profiles,
          fetching: false,
          fetched: true,
          // results: action.payload,
          totalPages: action.payload.totalPages,
          results: finalResult,
          error: null
        }
      };
    case "ON_PROFILE_FETCH_ERROR":
      return {
        ...state,
        profiles: {
          ...state.profiles,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };
    case "ON_NEWS_FETCH_START":
      return {
        ...state,
        news: {
          ...state.news,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_NEWS_FETCH_FULFILLED":
      //   var tempResults = action.payload.docs;
      //   var finalResult = [...state.news.results];
      //   for (var i = 0; i < tempResults.length; i++) {
      //     finalResult.push(tempResults[i]);
      //   }
      return {
        ...state,
        news: {
          ...state.news,
          fetching: false,
          fetched: true,
          totalPages: action.payload.totalPages,
          results: action.payload.data,
          error: null
        }
      };
    case "ON_NEWS_FETCH_ERROR":
      return {
        ...state,
        news: {
          ...state.news,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };
    case "ON_PLACES_FETCH_START":
      return {
        ...state,
        places: {
          ...state.places,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_PLACES_FETCH_FULFILLED":
      var tempResults = action.payload.data;
      var finalResult = [...state.places.results];
      for (var i = 0; i < tempResults.length; i++) {
        finalResult.push(tempResults[i]);
      }
      return {
        ...state,
        places: {
          ...state.places,
          fetching: false,
          fetched: true,
          totalPages: action.payload.totalPages,
          results: finalResult,
          error: null
        }
      };
    case "ON_PLACES_FETCH_ERROR":
      return {
        ...state,
        places: {
          ...state.places,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };
    case "ON_MARKETPLACE_FETCH_START":
      return {
        ...state,
        marketplaces: {
          ...state.marketplaces,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_MARKETPLACE_FETCH_FULFILLED":
      var tempResults = action.payload.data;
      var finalResult = [...state.marketplaces.results];
      for (var i = 0; i < tempResults.length; i++) {
        finalResult.push(tempResults[i]);
      }
      return {
        ...state,
        marketplaces: {
          ...state.marketplaces,
          fetching: false,
          fetched: true,
          totalPages: action.payload.totalPages,
          results: finalResult,
          error: null
        }
      };
    case "ON_MARKETPLACE_FETCH_ERROR":
      return {
        ...state,
        marketplaces: {
          ...state.marketplaces,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };
    case "ON_HOTEL_FETCH_START":
      return {
        ...state,
        hotels: {
          ...state.hotels,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_HOTEL_FETCH_FULFILLED":
      var tempResults = action.payload.data;
      var finalResult = [...state.hotels.results];
      for (var i = 0; i < tempResults.length; i++) {
        finalResult.push(tempResults[i]);
      }
      return {
        ...state,
        hotels: {
          ...state.hotels,
          fetching: false,
          fetched: true,
          totalPages: action.payload.totalPages,
          results: finalResult,
          error: null
        }
      };
    case "ON_HOTEL_FETCH_ERROR":
      return {
        ...state,
        hotels: {
          ...state.hotels,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };
    case "ON_INSTITUTE_FETCH_START":
      return {
        ...state,
        institutes: {
          ...state.institutes,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_INSTITUTE_FETCH_FULFILLED":
      var tempResults = action.payload.data;
      var finalResult = [...state.institutes.results];
      for (var i = 0; i < tempResults.length; i++) {
        finalResult.push(tempResults[i]);
      }
      return {
        ...state,
        institutes: {
          ...state.institutes,
          fetching: false,
          fetched: true,
          totalPages: action.payload.totalPages,
          results: finalResult,
          error: null
        }
      };
    case "ON_INSTITUTE_FETCH_ERROR":
      return {
        ...state,
        institutes: {
          ...state.institutes,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };
    case "ON_NOTICE_FETCH_START":
      return {
        ...state,
        notices: {
          ...state.notices,
          fetching: true,
          fetched: false,
          error: null
        }
      };
    case "ON_NOTICE_FETCH_FULFILLED":
      var tempResults = action.payload.data;
      var finalResult = [...state.notices.results];
      for (var i = 0; i < tempResults.length; i++) {
        finalResult.push(tempResults[i]);
      }
      return {
        ...state,
        notices: {
          ...state.notices,
          fetching: false,
          fetched: true,
          totalPages: action.payload.totalPages,
          results: finalResult,
          error: null
        }
      };
    case "ON_NOTICE_FETCH_ERROR":
      return {
        ...state,
        notices: {
          ...state.notices,
          fetching: false,
          fetched: true,
          results: [],
          error: action.payload
        }
      };

    case "ON_RESET_RESULTS":
      return {
        ...state,
        profiles: {
          ...state.profiles,
          results: []
        },
        news: {
          ...state.news,
          results: []
        },
        marketplaces: {
          ...state.marketplaces,
          results: []
        },
        hotels: {
          ...state.hotels,
          results: []
        },
        institutes: {
          ...state.institutes,
          results: []
        },
        notices: {
          ...state.notices,
          results: []
        },
        places: {
          ...state.places,
          results: []
        }
      };
    case "ON_SET_LOCATION":
      return {
        ...state,
        location: action.payload.location,
        type: action.payload.type
      };
    case "ON_CLEAR_RESULTS":
      return initialState;
    default:
      return state;
  }
}
