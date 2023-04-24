import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faPlay,faPlus,faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { eventNames } from 'process';
import TransitionDiv from '../components/transition';
export const Card = ({ active,title,desc,aName,img }) => {
  return (
    <div className="card">
      <img src={img} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title} by {aName}</h5>
        <p className="card-text">{desc}</p>
      </div>
      <div className='card-buttons'>
        {/* <FontAwesomeIcon icon={faPlus} /> */}
        <FontAwesomeIcon icon={faPlay} onClick={()=>{active(_id)}}/>
        {/* <FontAwesomeIcon icon={faAngleDown} /> */}
      </div>
    </div>
  );
};

const CardShowcase = ({active, items , col }) => {
  let [overflow,set_overflow] = useState(0)
  const overflow_length = col
  
  const handleRightArrowClick = (event) => {
    if(overflow < items.length - overflow_length)
    set_overflow(overflow+overflow_length)
};
const handleLeftArrowClick = (event) => {
  if(overflow >= overflow_length){
  set_overflow(overflow-overflow_length)
  }
};

  return (
    <div className="card-showcase">
      { overflow >= overflow_length ? <FontAwesomeIcon icon={faArrowLeft} className='left' onClick={handleLeftArrowClick}/> : ""}
      <div className='cards-section'>
      {items.slice(overflow,overflow+overflow_length).map((item) => (
        <Card active={active} key={(item._id).toString()} {...item} />
      ))}
      </div>
      { overflow < items.length - overflow_length ?  <FontAwesomeIcon icon={faArrowRight} className='right' onClick={handleRightArrowClick}/> : ""}
    </div>
  );
};

export default CardShowcase;