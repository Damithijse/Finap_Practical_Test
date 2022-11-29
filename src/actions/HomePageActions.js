const APIKEY = '8867aa7589884af496c6cfd87793d3fa';

export const getTopHedlines = page => async dispatch => {
  //console.log('working', page);
  const options = {
    method: 'GET',
  };
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${APIKEY}`,
    options,
  )
    .then(response => response.json())
    .then(json => {
      //console.log(json.articles, 'nnn');
      dispatch({
        type: 'SET_PAGE_COUNT',
        payload: page + 1,
      });
      dispatch({
        type: 'CHANGE_HEADLINES_DATA',
        payload: json.articles,
      });
      dispatch({
        type: 'SET_LOADING_STATE',
        payload: false,
      });
    })
    .catch(err => console.error(err, 'error'));
};
export const changeComponent = data => async dispatch => {
  dispatch({
    type: 'CHANGE_COMPONENT',
    payload: data,
  });
};
export const changePageCount = () => async dispatch => {
  dispatch({
    type: 'SET_PAGE_COUNT',
    payload: 1,
  });
};
export const setLoadingState = data => async dispatch => {
  dispatch({
    type: 'SET_LOADING_STATE',
    payload: data,
  });
};

export const setNewsItem = data => async dispatch => {
  dispatch({
    type: 'SET_SELECTED_NEWS_ITEM',
    payload: data,
  });
};

export const getSearchData = (text, page) => async dispatch => {
  const options = {
    method: 'GET',
  };
  //console.log(text, 'textt');
  fetch(
    `https://newsapi.org/v2/everything?q=${text}&page=${page}&pageSize=10&apiKey=${APIKEY}`,
    options,
  )
    .then(response => response.json())
    .then(json => {
      //console.log(json.articles, 'll');
      dispatch({
        type: 'SET_PAGE_COUNT',
        payload: page + 1,
      });
      dispatch({
        type: 'SET_SEARCHING_DATA',
        payload: json.articles,
      });
      dispatch({
        type: 'SET_LOADING_STATE',
        payload: false,
      });
    })
    .catch(err => console.error(err, 'error'));
};
export const getEverything = (cat, page) => async dispatch => {
  const options = {
    method: 'GET',
  };
  //console.log(page);
  fetch(
    `https://newsapi.org/v2/everything?q=${cat}&page=${page}&pageSize=10&apiKey=${APIKEY}`,
    options,
  )
    .then(response => response.json())
    .then(json => {
      //console.log(json.articles, 'll');
      dispatch({
        type: 'SET_PAGE_COUNT',
        payload: page + 1,
      });
      dispatch({
        type: 'CHANGE_NEWS',
        payload: json.articles,
      });
      dispatch({
        type: 'SET_SEARCHING_DATA',
        payload: json.articles,
      });
      dispatch({
        type: 'SET_LOADING_STATE',
        payload: false,
      });
    })
    .catch(err => console.error(err, 'error'));
};
