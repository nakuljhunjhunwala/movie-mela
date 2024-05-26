import './index.css'

interface BannerProps {
    title: string;
    description: string;
}

const defaultProps: BannerProps = {
    title: 'Title',
    description: 'Description'
}

function Banner(props: BannerProps = defaultProps) {
  return (
    <div className='mm-banner--container'>
        <h1 className='mm-banner--title'>{props.title}</h1>
        <p className='mm-banner--description'>{props.description}</p>
    </div>
  )
}

export default Banner