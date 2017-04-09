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

export const getArtists = (bandName) => {
  return dispatch => {
    dispatch(startingRequest());
    let payload = `query  {
      search {
        artists(query: "${bandName}", first: 10){
          edges{
          	node{
              id, name, type
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
