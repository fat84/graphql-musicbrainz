import React from 'react';
import Date from './date.js';

export default (props) => {
  let coverJsx = (props.album && props.album.node && props.album.node.coverArt && props.album.node.coverArt.front) ?
  <div className="card-image">
    <img src={props.album.node.coverArt.front}/>
  </div>
  : <div></div>;

  let dateJsx = (props.album && props.album.node && props.album.node.date) ?
    <Date date={props.album.node.date}/>
  : <span></span>


  return (
    <div className="col s12 m6 l3 album-col">
      <div className="card">
        {coverJsx}
        <div className="card-content">
          <span className="card-title">
            {props.album.node.title}
          </span>
          <p>{dateJsx}</p>
        </div>
      </div>
    </div>
  );
}
