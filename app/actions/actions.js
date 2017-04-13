import searchUtils from 'searchUtils';

const startingRequest = () => {
  return {
    type: 'STARTING_REQUEST'
  }
}

const finishedRequest = (response) => {
  return {
    type: 'FINISHED_REQUEST',
    response
  }
}

const setArtist = (name, dispatch) => {
  return {
    type: 'SET_ARTIST',
    name
  }
}

const showAlbums = (artistId, dispatch) => {
  return {
    type: 'SHOW_ALBUMS',
    artistId
  }
}

const setPaginationLocation = (integer) => {
  return {
    type: 'SET_PAGINATION_LOCATON',
    integer
  }
}

const getNextArtists = (artistName, cursor) => {
  return dispatch => {
    dispatch(setPaginationLocation(1));
    dispatch(startingRequest());


    let payload = searchUtils.makePayload(artistName, cursor);
    return searchUtils.sendGraphRequest(payload, dispatch, finishedRequest);
  }
}

const getArtists = (artistName, dispatch) => {
  return dispatch => {
    dispatch(setArtist(artistName));
    dispatch(startingRequest());
    let payload = searchUtils.makePayload(artistName, null);
    return searchUtils.sendGraphRequest(payload, dispatch, finishedRequest);
  }
}

export const actions = {
  showAlbums,
  getArtists,
  getNextArtists
}
