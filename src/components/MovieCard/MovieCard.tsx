import './index.css'

import EmptyBookMark from '../../assets/EmptyBookMark.svg'
import FilledBookMark from '../../assets/FilledBookMark.svg'

interface MovieCardProps {
    id: string
    title: string
    year: string
    image: string
    isBookmarked?: boolean
    onBookmarkClick?: (id: string) => void
    }

function MovieCard(props: MovieCardProps) {
  return (
    <div className='mm-moviecard-container'>
        <div className='mm-moviecard--poster'>
          <img src={`${props.image}`} alt='Movie Poster' onError={(e)=>{
            e.currentTarget.src = 'https://via.placeholder.com/300x450?text=Movie+Poster+Not+Available'
          }} />
        </div>
        <div className='mm-moviecard--info'>
          <h2>{props.title}</h2>
            <p>{props.year}</p>
          {/* <p>Movie Description</p> */}
        </div>

<img src={props.isBookmarked ? FilledBookMark : EmptyBookMark} className='mm-moviecard--bookmark'
onClick={()=>{
    if (props.onBookmarkClick) {
        props.onBookmarkClick(props.id)
    }
}}
></img>

    </div>
  )
}

export default MovieCard
