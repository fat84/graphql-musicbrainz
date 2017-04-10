import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/actions.js';
import Loading from './partials/Loading.js';
import Artist from './partials/Artist.js';
// import glob from 'style';

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(
      actions.getArtists('The Beatles')
    );
  },
  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = this.props.store.get('fetching');
    let queryText;
    let artists = this.props.store ? this.props.store.get('data').toObject().edges : null;
    let loadingJsx = (fetchInProgress === true) ?
      <div>
        <Loading />
      </div>
    : <div></div>;

    let artistsList = artists ? artists.map(
      (artist, i) => {
        return <Artist artist={artist} store={this.props.store} key={i} dispatch={dispatch}/>;
      }
    ) : null;

    let artistsJsx =  (artists && artists.length > 0) ?
      <ul className="collection with-header">
      <li className="collection-header"><h2>Results</h2></li>
      {artistsList}
      </ul>
    : <div></div>;

    let fetchMessage =  fetchInProgress ? 'Searching...' : 'No Results';

    let resultsJsx = ( fetchInProgress != true && artists && artists.length>0 ) ?
      <div>
        {artistsJsx}
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
});

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
