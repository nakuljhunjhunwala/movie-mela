import './index.css'

import { useDispatch, useSelector } from 'react-redux'

import MovieIcon from "../../assets/MovieIcon.svg"
import { RootState } from '../../store/store'
import { selectList } from '../../store/watchListSlicer'

function WatchList() {
    const { watchList, selectedList } = useSelector((state: RootState) => state.watchList)
    const dispatch = useDispatch()
  return (
    <div className='mm-watch-list--container'>
      <h1
      className='mm-watch-list--title'
      >WatchList</h1>
        <ul
        className='mm-watch-list--list'
        >
            {Object.keys(watchList).map((name) => (
            <li key={name} data-selected={
              selectedList === name
            }>
              <div
              className='mm-watch-list--list-item'
              onClick={()=>{
                dispatch(selectList(name))
              }}
              >
                <img src={MovieIcon} alt="movie icon" />
                <h3>{name}</h3>
              </div>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default WatchList
