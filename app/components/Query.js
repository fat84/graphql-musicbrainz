import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/actions.js';
import Loading from './partials/Loading.js';
import Artist from './partials/Artist.js';
import glob from 'style';


class Query extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      actions.getArtists('The Beatles')
    );
  }

  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = this.props.store.get('fetching');
    let artistName = this.props.store.get('artist_name');
    let queryText;
    let data = ( this.props.store && this.props.store.get('data') ) ? this.props.store.get('data').toObject() : null;
    let searchedArtist = ( this.props.store && this.props.store.get('artist_name') ) ? this.props.store.get('artist_name') : null;
    let artists = data ? data.edges : null;
    let cursor = ( data && data.pageInfo && data.pageInfo.endCursor ) ? data.pageInfo.endCursor : null;
    let fetchMessage =  fetchInProgress ? 'Searching...' + searchedArtist : 'No Results';

    // Pagination
    let firstArg = configVariables.query.first;
    let paginationLocation = ( this.props.store && this.props.store.get('pagination_location') ) ? this.props.store.get('pagination_location') : null;
    let currentResultsLoc = firstArg*paginationLocation;
    let locationJsx = paginationLocation ? <span>{currentResultsLoc}</span> : <span></span>;

    // Loading
    let loadingJsx = (fetchInProgress === true) ?
      <div><Loading /></div>
    : <div></div>;

    // Results
    let totalResultsJsx = ( data && data.totalCount ) ?
      <span>{data.totalCount.toLocaleString()}</span>
    : <span></span>;
    let resultsWord =  (data.totalCount && data.totalCount > 1) ? 'Results' : 'Result';

    // Artists List
    let artistsList = artists ? artists.map(
      (artist, i) => {
        return <Artist artist={artist} store={this.props.store} key={i} dispatch={dispatch}/>;
      }
    ) : null;
    let artistsJsx = (artists && artists.length > 0) ?
      <ul className="collection with-header">
      <li className="collection-header"><h2>{locationJsx} of {totalResultsJsx} {resultsWord}</h2></li>
      {artistsList}
      </ul>
    : <div></div>;

    let resultsJsx = ( fetchInProgress != true && artists && artists.length>0 ) ?
      <div>
        {artistsJsx}
        <div className="row">
          <div className="col s12">
            <button className="btn-flat waves-effect waves-light cyan lighten-1" onClick={(e) => {
              e.preventDefault();
              dispatch(actions.getNextArtists(artistName, cursor))}
            }>
              Next
            </button>
          </div>
        </div>
      </div>
    : <div><h2>{fetchMessage}</h2></div>;

    return (
      <div>
        <h1 className="center">Artist Search</h1>
        <div className="row">
          <form className="card-panel brown darken-1 z-depth-0 col s12 m6 offset-m3">
            <div className="row">
              <div className="input-field col s12">
                <input ref={node => {queryText = node}} placeholder="Artist Name"></input>
              </div>
              <div className="input-field col s12">
                <button className="btn-flat waves-effect waves-light cyan lighten-1" onClick={(e) => {
                  e.preventDefault();
                  dispatch(actions.getArtists(queryText.value))}
                }>
                  query
                </button>
              </div>
            </div>
          </form>
        </div>
        {loadingJsx}
        <div className="card-panel grey lighten-4 z-depth-0">
          {resultsJsx}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
