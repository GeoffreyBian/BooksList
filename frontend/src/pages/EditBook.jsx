import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
        .get(`http://localhost:5555/books/${id}`)
        .then((response) => {
            setAuthor(response.data.author);
            setTitle(response.data.title);
            setPublishYear(response.data.publishYear);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            alert("Error happened.");
            setLoading(false);
        })
  }, []);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited!", { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('Error occurred');
        enqueueSnackbar("Error!", { variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-600 p-4 mx-auto'>
        <Input label='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label='Author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Input label='Year Published' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
        Save Book
      </button>
    </div>
  );
};

const Input = ({ label, value, onChange }) => (
  <div className='flex flex-col border-2 border-sky-400 rounded-xl w-600 p-4 mx-auto mb-4'>
    <label className='text-xl mr-4 text-gray-500'>{label}</label>
    <input type='text' value={value} onChange={onChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
  </div>
);

export default EditBook;