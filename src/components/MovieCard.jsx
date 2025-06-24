import React from 'react'

const MovieCard = (props) => {
    const {movieTitle, rating, coverImage} = {props}
  return (
    <div className='flex flex-col h-[135px] w-[240px] aspect-[16/9]'>
        <img src= {"https://image.tmdb.org/t/p/"
 +  {coverImage}} className='w-full h-full bg-black/80'></img>
    </div>
  )
}

export default MovieCard