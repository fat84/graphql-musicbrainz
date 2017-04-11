const startingRequest = () => {
  return {
    type: 'STARTING_REQUEST'
  }
}

const finishedRequest = (response) => {
  return {
    type: 'FINISHED_REQUEST',
    response: response
  }
}

const showAlbums = (artistId, dispatch) => {
  return {
    type: 'SHOW_ALBUMS',
    artistId: artistId
  }
}

const makePayload = (bandName, cursor) => {
  let afterCursor = cursor ? cursor : null;
  return `query  {
    search {
      artists(query: "${bandName}", first: 1, after: "${afterCursor}" ){
        edges{
          cursor,
          node{
            id, country, name, type,
            releases(status:OFFICIAL) {
              edges {
                node {
                  id, date, title,
                  labels {
                    edges {
                      node {
                        id, name
                      }
                    }
                  },
                  media {
                    title
                    format
                    formatID
                    position
                    trackCount
                  },
                  coverArt {
                    front, back
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
}

const sendGraphRequest = (payload, dispatch) => {
  new Promise(function(resolve, reject) {
    let request=new XMLHttpRequest();
    request.open('POST', '/graphbrainz', true);
    request.setRequestHeader('Content-Type', 'application/graphql');
    request.send(payload);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        resolve(request.responseText)
      }
    }
  }).then(response => {
    dispatch(finishedRequest(JSON.parse(response)))
  })
}

const getArtists = (bandName, dispatch) => {
  return dispatch => {
    dispatch(startingRequest());
    let payload = makePayload(bandName);
    return sendGraphRequest(payload, dispatch);
  }
}

export const actions = {
  showAlbums,
  getArtists
}
