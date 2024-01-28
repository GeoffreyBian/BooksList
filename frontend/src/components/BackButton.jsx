import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <Link to={destination} className='flex items-center text-sky-800 hover:underline'>
      <BsArrowLeft className='text-2xl mr-2' />
      <span className='text-sky-800'>Back</span>
    </Link>
  );
};

export default BackButton;