import React from 'react';
var lookup = require('country-data').lookup;
import { actions } from '../../actions/actions.js';
import Album from './Album.js';

export default (props) => {
  let countryData = ( props.artist && props.artist.node && props.artist.node.country ) ? lookup.countries({alpha2: props.artist.node.country})[0] : null;

  let showAlbumJsx = (props.store.get('show_albums') && props.store.get('show_albums').has(props.artist.node.id)) ? true : false;

  let countryJsx = countryData ?
    <div>
      {countryData.emoji} {countryData.name}
    </div>
  : <div>
    </div>;

  let albumJsx = ( showAlbumJsx && props.artist && props.artist.node.releases && props.artist.node.releases.edges && props.artist.node.releases.edges.length >0 ) ?
    props.artist.node.releases.edges.map((album, i) => {
      return <Album album={album}  key={i}/>;
    })
  : <div></div>;

  let buttonText = ( showAlbumJsx ) ? 'Hide Albums' : 'View Albums';


  let artistJsx = (props.artist) ?
    <li className="collection-item">
      <h3>{props.artist.node.name}</h3>
      <h4>{countryJsx}</h4>
      <button id={props.artist.node.id} className="btn btn-flat cyan lighten-4" style={{margin: '10px 0'}} onClick={(e) => {
        e.preventDefault();
        props.dispatch(actions.showAlbums(props.artist.node.id))}
      }>
        {buttonText}
      </button>
      <div className="row">
        {albumJsx}
      </div>
    </li>
  : <div></div>;
  return artistJsx;
};
