const INITIAL_STATE = {
  loadingIndicate: false,
  userDetails: null,
  currentScreen: 'HOME',
  headlinesData: [],
  news: [],
  pageCount: 1,
  searchData: [],
  newsItem: [],
  categories: [
    {title: 'Business', key: 'business'},
    {title: 'Entertainment', key: 'entertainment'},
    {title: 'Health', key: 'health'},
    {title: 'Science', key: 'science'},
    {title: 'Technology', key: 'technology'},
    {title: 'HongKong', key: 'hk'},
    {title: 'NewZealand', key: 'nz'},
    {title: 'USA', key: 'us'},
  ],
};

function loadingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return {...state, loadingIndicate: action.payload};
    case 'SET_SEARCHING_DATA':
      return {...state, searchData: action.payload};
    case 'SET_USER_DETAILS':
      console.log(action.payload, 'action.payload');
    case 'SET_PAGE_COUNT':
      return {...state, pageCount: action.payload};
    case 'SET_SELECTED_NEWS_ITEM':
      return {...state, newsItem: action.payload};
    case 'CHANGE_COMPONENT':
      return {...state, currentScreen: action.payload};
    case 'CHANGE_HEADLINES_DATA':
      return {...state, headlinesData: action.payload};
    case 'CHANGE_NEWS':
      return {...state, news: action.payload};
    default:
      return state;
  }
}

export default loadingReducer;
