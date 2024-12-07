import React from 'react'
import Parrafo from './Parrafo'
import Subtitulos from './Subtitulos'

interface NewsItem {
    title: string;
    description: string;
    date: string;
    author: string;
    image_url: string;
}

interface NewsListProps {
    data: NewsItem;
}

const NewsCard: React.FC<NewsListProps> = ({ data }) => {
    return (
        <div className='row p-3 shadow rounded-4 mb-5'>
            <div className='col-6 w-75'>
                <small>{data.date}</small>
                <Subtitulos subtitulo={data.title} />
                <Parrafo parrafo={data.description} />
                <br />
                <small>{data.author}</small>
            </div>
            <div className='col-3 d-flex justify-content-center text-center w-25'>
                <img src={data.image_url} alt="" width={200} height={200} />
            </div>
        </div>
    )
}

export default NewsCard