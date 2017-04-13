const makePayload = (artistName, cursor) => {
  let afterCursor = cursor ? cursor : null;
  let firstArg = configVariables.query.first;

  return `query  {
    search {
      artists(query: "artist:${artistName}", first: ${firstArg}, after: "${afterCursor}" ){
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
        },
        totalCount,
        pageInfo{
          endCursor
        }
      }
    }
  }`
}

const sendGraphRequest = (payload, dispatch, finishedRequest) => {
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

const searchUtils = {
  sendGraphRequest,
  makePayload
}

module.exports = searchUtils;
