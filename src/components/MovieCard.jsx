import React from 'react'

const MovieCard = (props) => {
    const {movieTitle, rating, coverImage} = props
  return (
    <div className='flex flex-col h-[180px] w-[350px] aspect-[16/9] p-2 '>
        <img src= {"https://image.tmdb.org/t/p/original"
 +  coverImage} className='w-full h-full bg-black/80'></img>
    </div>
  )
}

export default MovieCard