import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? <Spinner /> : (
        <div className='border-2 border-sky-400 rounded-xl p-4'>
          <InfoItem label='Id' value={book._id} />
          <InfoItem label='Title' value={book.title} />
          <InfoItem label='Author' value={book.author} />
          <InfoItem label='Year Published' value={book.publishYear} />
          <InfoItem label='Created On' value={new Date(book.createdAt).toString()} />
          <InfoItem label='Last Updated' value={new Date(book.updatedAt).toString()} />
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>{label}</span>
    <span>{value}</span>
  </div>
);

export default ShowBook;