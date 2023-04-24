import { getAllPodcasts } from '../lib/db';
import CardShowcase from './cards';
import { useEffect, useState } from 'react';

var items = [
  {
    _id: 1,
    title: 'Card 1',aName : 'Nandan Varma',
    img: 'https://picsum.photos/200',
    desc: 'This is the first card',
  },
  {
    _id: 2,
    title: 'Card 2',aName : 'Nandan Varma',
    img: 'https://picsum.photos/200',
    desc: 'This is the second card',
  },
  {
    _id: 3,
    title: 'Card 3',
    img: 'https://picsum.photos/200',
    desc: 'This is the first card',
  },
  {
    _id: 4,
    title: 'Card 4',
    img: 'https://picsum.photos/200',
    desc: 'This is the second card',
  },  {
    _id: 5,
    title: 'Card 5',
    img: 'https://picsum.photos/200',
    desc: 'This is the first card',
  },
  {
    _id: 6,
    title: 'Card 6',
    img: 'https://picsum.photos/200',
    desc: 'This is the second card',
  },  {
    _id: 7,
    title: 'Card 7',
    img: 'https://picsum.photos/200',
    desc: 'This is the first card',
  },
  {
    _id: 8,
    title: 'Card 8',
    img: 'https://picsum.photos/200',
    desc: 'This is the second card',
  },  {
    _id: 9,
    title: 'Card 9',
    img: 'https://picsum.photos/200',
    desc: 'This is the first card',
  },
  {
    _id: 10,
    title: 'Card 10',
    img: 'https://picsum.photos/200',
    desc: 'This is the second card',
  },
];


export const Recommended = ({active,userId}) => {
  const [data,SetData] = useState(items)
  useEffect(() => {
    const fetchData = async () => {
      SetData(await getAllPodcasts());
    };
    fetchData();
    console.log(data);
  }, []);
  return (
    <div className='custom_card'>
      <h1 className='heading'>Recommended</h1>
      <CardShowcase active={active} items={data} col={3} />
    </div>
  );
};

export const TopPicks = ({active}) => {
  return (
    <div className='custom_card'>
      <h1 className='heading'>Top Picks</h1>
      <CardShowcase active={active} items={items} col={3} />
    </div>
  );
}

export const LibreVox = () => {
  const [LibreData,SetLibreData] = useState(items)
  useEffect(() => {
    fetch('https://librivox.org/api/feed/audiobooks?since=0&extended=1&limit=5&format=json')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.books.map(book => ({
          _id: book.id,
          name: book.title,
          desc: book.description,
          aName: book.authors[0].first_name + ' ' + book.authors[0].last_name,
          img: book.url_image
        }));
        SetLibreData(formattedData);
      });
  }, []);
  return (
    <div className='custom_card'>
      <h1 className='heading'>LibreVox Hits</h1>
      <CardShowcase items={LibreData} col={3} />
    </div>
  );
}

export default Recommended;