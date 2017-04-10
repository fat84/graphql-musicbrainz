import React from 'react';

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default (props) => {
  let fecha = props.date ? new Date(props.date) : null;

  let dateWord = months[fecha.getMonth()] + ' ' + fecha.getDate() + ', ' + fecha.getFullYear();

  return (
    <span>
      {dateWord}
    </span>
  );
}
