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


const getArtists = (bandName, dispatch) => {
  return dispatch => {
    dispatch(startingRequest());
    let payload = `query  {
      search {
        artists(query: "${bandName}", first: 5){
          edges{
          	node{
              id, country, name, type,
              releases {
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
    }`;

    return new Promise(function(resolve, reject) {
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
}

export const actions = {
  showAlbums,
  getArtists
}
