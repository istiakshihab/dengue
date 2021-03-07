/**
 * Created by Rajesh on 9/22/19.
 */

import axios from "axios";
const baseUrl = "/api/search";

export function fetchProfileData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_PROFILE_FETCH_START" });

    axios
      .get(
        `${baseUrl}?category=profile&location=${query}&area=${area}&page=${page}`
      )
      .then((resp) => {
        const d = resp.data;
        if (d.success) {
          dispatch({
            type: "ON_PROFILE_FETCH_FULFILLED",
            payload: {
              data: d.results.content,
              totalPages: d.results.totalPages,
            },
          });
        } else {
          dispatch({ type: "ON_PROFILE_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_PROFILE_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchNewsData(query, area, page = 1) {
  return function (dispatch) {
    dispatch({ type: "ON_NEWS_FETCH_START" });

    axios
      .post(`http://dev.pipilika.com:9191/search/dengue/content`, {
        [area]: query,
        page_no: page,
      })
      .then((resp) => {
        const d = resp.data.response.data;
        if (resp.status === 200) {
          dispatch({
            type: "ON_NEWS_FETCH_FULFILLED",
            payload: {
              data: d,
              totalPages: d.numFound / 10,
            },
          });
        } else {
          dispatch({ type: "ON_NEWS_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_NEWS_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchPipilikaNewsData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_NEWS_FETCH_START" });

    axios
      .get(
        `http://dev.pipilika.com:5005/get_corona_news?location=${query}&start_date=2020-03-01&end_date=2020-11-05&page_no=${page}&content_true=true&sort=false`
      )
      .then((resp) => {
        const d = resp.data.docs;
        if (resp.status === 200) {
          dispatch({
            type: "ON_NEWS_FETCH_FULFILLED",
            payload: {
              data: d,
              totalPages: 1000 / 10,
            },
          });
        } else {
          dispatch({ type: "ON_NEWS_FETCH_ERROR", payload: "Loading error" });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_NEWS_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchPlacesData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_PLACES_FETCH_START" });

    axios
      .get(
        `${baseUrl}?category=place&location=${query}&area=${area}&page=${page}`
      )
      .then((resp) => {
        const d = resp.data;
        if (d.success) {
          dispatch({
            type: "ON_PLACES_FETCH_FULFILLED",
            payload: {
              data: d.results.content,
              totalPages: d.results.totalPages,
            },
          });
        } else {
          dispatch({ type: "ON_PLACES_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_PLACES_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchHotelData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_HOTEL_FETCH_START" });

    axios
      .get(
        `${baseUrl}?category=hotel&location=${query}&area=${area}&page=${page}`
      )
      .then((resp) => {
        const d = resp.data;
        if (d.success) {
          dispatch({
            type: "ON_HOTEL_FETCH_FULFILLED",
            payload: {
              data: d.results.content,
              totalPages: d.results.totalPages,
            },
          });
        } else {
          dispatch({ type: "ON_HOTEL_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_HOTEL_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchMarketplaceData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_MARKETPLACE_FETCH_START" });

    axios
      .get(
        `${baseUrl}?category=marketplace&location=${query}&area=${area}&page=${page}`
      )
      .then((resp) => {
        const d = resp.data;
        if (d.success) {
          dispatch({
            type: "ON_MARKETPLACE_FETCH_FULFILLED",
            payload: {
              data: d.results.content,
              totalPages: d.results.totalPages,
            },
          });
        } else {
          dispatch({ type: "ON_MARKETPLACE_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_MARKETPLACE_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchInstituteData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_INSTITUTE_FETCH_START" });

    axios
      .get(
        `${baseUrl}?category=institute&location=${query}&area=${area}&page=${page}`
      )
      .then((resp) => {
        const d = resp.data;
        if (d.success) {
          dispatch({
            type: "ON_INSTITUTE_FETCH_FULFILLED",
            payload: {
              data: d.results.content,
              totalPages: d.results.totalPages,
            },
          });
        } else {
          dispatch({ type: "ON_INSTITUTE_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_INSTITUTE_FETCH_ERROR", payload: err });
      });
  };
}

export function fetchNoticeData(query, area, page = 0) {
  return function (dispatch) {
    dispatch({ type: "ON_NOTICE_FETCH_START" });

    axios
      .get(
        `${baseUrl}?category=notice&location=${query}&area=${area}&page=${page}`
      )
      .then((resp) => {
        const d = resp.data;
        if (d.success) {
          dispatch({
            type: "ON_NOTICE_FETCH_FULFILLED",
            payload: {
              data: d.results.content,
              totalPages: d.results.totalPages,
            },
          });
        } else {
          dispatch({ type: "ON_NOTICE_FETCH_ERROR", payload: d.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "ON_NOTICE_FETCH_ERROR", payload: err });
      });
  };
}

export function resetResultData() {
  return function (dispatch) {
    dispatch({ type: "ON_RESET_RESULTS" });
  };
}

export function clearResultData() {
  return function (dispatch) {
    dispatch({ type: "ON_CLEAR_RESULTS" });
  };
}
