import Immutable from 'immutable';
const immutableState = Immutable.Map({
  fetching: false,
  data: Immutable.Map({}),
  show_albums: new Set(),
  artist_name: null,
  pagination_location: 1
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
    case 'SET_ARTIST':
      return state.set('artist_name', action.name);
    case 'SHOW_ALBUMS':
      let albumSet = new Set(state.get('show_albums'));

      if (albumSet.has(action.artistId)) {
        albumSet.delete(action.artistId);
      } else {
        albumSet.add(action.artistId);
      }

      return state.set('show_albums', albumSet);
    case 'SET_PAGINATION_LOCATON':
      let newLoc = state.get('pagination_location') + action.integer;
      return state.set('pagination_location', newLoc);
    default:
      return state;
  }
}
