import React from "react";
import { useState} from "react";
import * as Realm from "realm-web";

export default function Form(){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [audio, setAudio] = useState(null);
    const [imageURL, setImageURL] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const REALM_ID = "audis-rnyow";
        const app = new Realm.App({id:REALM_ID});
        const cred = Realm.Credentials.anonymous();
        const newPodcast = {aName:name,title,desc:description,audio,img:imageURL}
        try{
            const user = await app.logIn(cred);
            const res = await user.functions.uploadPodcast(newPodcast);
            if(res.error)
                console.log(res.error);
            else
                console.log(res);
        }
        catch (error){
            console.log(error);
        }
    };

    function fileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(new Blob([event.target.result]));
        };
        reader.onerror = (event) => {
          reject(event.target.error);
        };
        reader.readAsArrayBuffer(file);
      });
    }
    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          resolve(base64);
        };
        reader.onerror = (event) => {
          reject(event.target.error);
        };
        reader.readAsDataURL(blob);
      });
    }
    async function handleAudio(event) {
        const file = event.target.files[0];
        setAudio(file);
        const blob = await fileToBlob(file);
        const base = await blobToBase64(blob);
        setAudio(base.substring(37));
      }
    

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Audio:
        <input type="file" onChange={e => handleAudio(e)} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" value={imageURL} onChange={e => setImageURL(e.target.value)} />
      </label>
      <br />
      <button type="submit" >Submit</button>
    </form>
  );

}