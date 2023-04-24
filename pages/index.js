import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { connectToDatabase } from '../lib/mongodb';
import { useState } from 'react';

export default function Home({ data }) {
  const [results, setResults] = useState(data);

  const handleSearch = async (query) => {
    const { db } = await connectToDatabase();
    const data = await db.collection('collection_name').find({
      // query criteria here
    }).toArray();
    setResults(data);
  };

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      {results.map((result) => (
        <SearchResult key={result._id} result={result} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection('collection_name').find({}).toArray();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
}
