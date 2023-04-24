import NavBar from '../components/navbar';
import Player from '../components/player';
import { useState,useEffect } from 'react';
import {Recommended, TopPicks , LibreVox} from '../components/customcards';
import { Files,searchByName,getAudio } from '../lib/db'
import SearchBar from '../components/search'
import Footer from '../components/footer';
import {auth} from '../lib/firebase'


export default function Home() {
  const [activeId,SetActiveId] = useState(0)
  const [UID,setUID] = useState(null);
  const [audio, setAudio] = useState(0);
  if(auth.currentUser){
    if(auth.currentUser){
      setUID(auth.currentUser.uid)
    }
  }
  const handleSearch = (searchTerm) => {
    const [data,SetData] = useState("")
    useEffect(() => {
      const fetchData = async () => {
        SetData(await searchByName(searchTerm));
      };
      fetchData();
    }, []);
    console.log(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await Files();
      // if (data[0] && typeof data[0].audio.base64 === 'string') {
      //   setAudio(getAudio(data[0].audio));
      // } else {
      //   // Handle invalid data
      // }
    };
    fetchData();
  }, []);
  return (
    <main>
      <title>Podcasts</title>
      <NavBar></NavBar>
      <SearchBar onSearch={handleSearch} />
      <TopPicks  active={SetActiveId} ></TopPicks>
      <Recommended active={SetActiveId} userId={UID}></Recommended>
      {/* <LibreVox></LibreVox> */}
      <Footer></Footer>
      <Player audio={{audio}}></Player>
    </main>
  )
}
