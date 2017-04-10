import React from 'react';

export default (props) => {
  let coverJsx = (props.album && props.album.node && props.album.node.coverArt && props.album.node.coverArt.front) ?
  <div className="card-image">
    <img src={props.album.node.coverArt.front}/>
  </div>
  : <div></div>;


  return (
    <div className="col s12 m6 l3 album-col">
      <div className="card">
        {coverJsx}
        <div className="card-content">
          <span className="card-title">
            {props.album.node.title}
          </span>
          <p>{props.album.node.date}</p>
        </div>
      </div>
    </div>
  );
}
