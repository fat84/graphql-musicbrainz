import Immutable from 'immutable';
const immutableState = Immutable.Map({
  fetching: false,
  data: Immutable.Map({})
})

export const queryReducer = (state = immutableState, action) => {
  switch (action.type) {
    case 'STARTING_REQUEST':
      return state.set('fetching', true);
    case 'FINISHED_REQUEST':
      if (action.response.data && action.response.data.search && action.response.data.search.artists && action.response.data.search.artists.edges) {
        var results = action.response.data.search.artists;
        return state.set('fetching', false).set('data', Immutable.Map(results));
      }
      return;
    default:
      return state
  }
}
