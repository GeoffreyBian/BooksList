

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import AddBooks from './pages/AddBooks';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import ShowBook from './pages/ShowBook';
import RandomPage from './pages/RandomPage.jsx'; // Import the new page

const App = () => {
  return (
    // <div className='bg-red'>Hello</div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/add' element={<AddBooks />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />

      <Route path='/random' element = {<RandomPage />} />
    </Routes>
  )
}

export default App;