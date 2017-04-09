import React from 'react';

export default (props) => {

  let artistJsx = (props.artist) ?
    <li>{props.artist.node.name}</li>
  : <div></div>;
  return artistJsx;
};
