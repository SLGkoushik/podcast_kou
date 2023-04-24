import React from 'react';
import * as Realm from 'realm-web';

function getAudio(base64) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  return audio;
}

async function Files() {
    const REALM_ID = 'audis-rnyow';
    const app = new Realm.App({ id: REALM_ID });
    const cred = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(cred);
      const allData = await user.functions.getAllAudios();
      console.log(allData)
      return allData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async function getPodcastById() {
    const REALM_ID = 'audis-rnyow';
    const app = new Realm.App({ id: REALM_ID });
    const cred = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(cred);
      const allData = await user.functions.getPodcast();
      console.log(allData)
      return allData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async function getAllPodcasts() {
    const REALM_ID = 'audis-rnyow';
    const app = new Realm.App({ id: REALM_ID });
    const cred = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(cred);
      const allDesc = await user.functions.getDescriptionAll();
      console.log(allDesc)
      return allDesc;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async function searchByName(name){
    const REALM_ID = 'audis-rnyow';
    const app = new Realm.App({ id: REALM_ID });
    const cred = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(cred);
      const searched = await user.functions.searchPodcast(name);
      console.log(searched)
      return searched;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async function audioById(Id){
    const REALM_ID = 'audis-rnyow';
    const app = new Realm.App({ id: REALM_ID });
    const cred = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(cred);
      const searched = await user.functions.searchPodcast(Id);
      console.log(searched)
      return searched;
    } catch (error) {
      console.log(error);
      return {};
    }
  }


export { Files, getAudio , getAllPodcasts,searchByName};