import React from 'react';
import Date from 'datePartial';

export default (props) => {
  console.log('props.album.node',props.album.node);
  let coverJsx = (props.album && props.album.node && props.album.node.coverArt && props.album.node.coverArt.front) ?
  <div className="card-image">
    <img src={props.album.node.coverArt.front}/>
  </div>
  : <div></div>;

  let dateJsx = (props.album && props.album.node && props.album.node.date) ?
    <Date date={props.album.node.date}/>
  : <span></span>

  let labelsJsx = (props.album && props.album.node && props.album.node.labels && props.album.node.labels.edges&& props.album.node.labels.edges.length>0) ?
    props.album.node.labels.edges.map((label, i) => {
      return <div>{label.node.name}</div>
    })
  : <div></div>;

  let mediaJsx = (props.album && props.album.node && props.album.node.media) ?
    props.album.node.media.map((mediaEl) => {
      let mediaFormat = mediaEl.format ? mediaEl.format + ' | ' : '';
      let trackWord = (mediaEl.trackCount && mediaEl.trackCount > 1) ? 'Tracks' : 'Track'
      return <li>{mediaFormat}{mediaEl.trackCount} {trackWord}</li>
    })
  : <div></div>;

  return (
    <div className="col s12 m6 l3 album-col">
      <div className="card">
        {coverJsx}
        <div className="card-content">
          <span className="card-title">
            {props.album.node.title}
          </span>
          <p>{dateJsx}</p>
          <ul>{mediaJsx}</ul>
          {labelsJsx}
        </div>
      </div>
    </div>
  );
}
