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
    case 'SHOW_ALBUMS':
      let albumSet = state.get('show_albums') ? new Set(state.get('show_albums')) : new Set();

      if (albumSet.has(action.artistId)) {
        albumSet.delete(action.artistId);
      } else {
        albumSet.add(action.artistId)
      }

      return state.set('show_albums', albumSet);
    default:
      return state
  }
}
