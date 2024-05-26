import './index.css'

import { fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess, resetMovies } from '../../store/movieSlicer';

import React from 'react'
import axios from 'axios';
import { selectList } from '../../store/watchListSlicer';
import { useDispatch } from 'react-redux';

interface SearchBarProps {
    hideSubmit?: boolean
}

const defaultProps: SearchBarProps = {
    hideSubmit: false
}

function SearchBar(props: SearchBarProps = defaultProps) {

    const [searchTerm, setSearchTerm] = React.useState('');
    const dispatch = useDispatch();




    async function handleSubmit() {
        dispatch(resetMovies());
        dispatch(selectList(null));
        setSearchTerm('');
        dispatch(fetchMoviesStart());
        try {
          const response = await axios.get(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}&s=${searchTerm || 'marvel'}`);
          dispatch(fetchMoviesSuccess(response.data.Search || []));
        } catch (error: any) {
          dispatch(fetchMoviesFailure(error.message));
        }
    }

  return (
    <div className='mm-searchbar--container'>
        <input className='mm-searchbar--input' value={searchTerm} onChange={(e)=>{
            setSearchTerm(e.currentTarget.value)
        }}
        onKeyDown={(e)=>{
            if (e.key === 'Enter') {
                handleSubmit()
            }
        }
        }
        type="text" name="search" placeholder='Search...' autoComplete='off'/>
        {
            !props.hideSubmit && <button
            className='mm-searchbar--submit' type="submit" onClick={handleSubmit}>Submit</button>
        }
    </div>
  )
}

export default SearchBar