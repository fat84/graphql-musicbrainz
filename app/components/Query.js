import React from 'react';
import { connect } from 'react-redux';
import { getArtist } from '../actions/actions.js';
import Loading from './partials/Loading.js';
import Artist from './partials/Artist.js';

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(
      getArtist('The Beatles')
    );
  },
  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    let artists = this.props.store ? this.props.store.get('data').toObject().edges : null;

    let loadingJsx = (this.props.store.get('fetching') === true) ?
      <div>
        <Loading />
      </div>
    : <div></div>;

    let resultsJsx = ( artists && artists.length>0 ) ? (artists).map(
        (artist, i) => (
          <Artist artist={artist} key={i}/>
        )
      )
      :<div>No Results</div>;


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
                <button className="btn btn-flat cyan" onClick={(e) => {
                  e.preventDefault();
                  dispatch(getArtist(queryText.value))}
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
