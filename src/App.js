import React, {Fragment, useState, useEffect} from 'react';
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from 'axios';
import Form from './components/Form'; 
import Song from './components/Song'; 
import Artist from './components/Artist';
import Spinner from './components/Spinner';
import Error from './components/Error';

/**
 * @name: artists-lyrics.
 * @description: Artist and song searcher. Made with bootswatch & lyrics.ovh API & TheAudioDB's API.
 * @author: Juan Argudo.
 * @version: 08/04/20.
 */
function App() {
  const [searchLyrics, saveSearchLyrics] = useState({});
  const [lyrics, saveLyrics] = useState('');
  const [artist, saveArtist] = useState({});
  //Loading spinner flag
  const [loading, saveLoading] = useState(false);
  //Error message
  const [errorMessage, saveErrorMessage] = useState('');

  useEffect(()=>{
    if(Object.keys(searchLyrics).length===0) return;
    const APILyrics = async () => {
      const {artist, song} = searchLyrics;
      //URL to consult the lyrics
      const URL1=`https://api.lyrics.ovh/v1/${artist}/${song}`;
      //URL to consult the artist
      const URL2=`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
      //Errors 
      let APIflag=false;
 
      const [response1, response2] = await Promise.all([
        axios(URL1).catch(function (error) {
          APIflag=true;
        }),
        axios(URL2).catch(function (error) {
          APIflag=true;
        })
      ]);

      //Errors management
      if(APIflag||response1.data.lyrics===null||response2.data.artists===null) {    
        //Assigning an error message for the Error component
        saveErrorMessage("No se han encontrado resultados.");
      }
      else{
        //Clean errors
        saveErrorMessage('');
        //Show loading spinner
        saveLoading(true);
        //Update states & hide spinner 
        setTimeout(() => {
          saveLyrics(response1.data.lyrics);
          saveArtist(response2.data.artists[0]);
          saveLoading(false);
        }, 3000)
      }
    }
    APILyrics();
  }, [searchLyrics]);

  //Show spinner or result
  const component = (loading) ? <Spinner/> : null;

  return (
    <Fragment>
      <Form saveSearchLyrics={saveSearchLyrics}/>
      {/* SPINNER */}
      {component}
      {/* ERROR */}
      {(errorMessage!=='' && !loading) ? <Error message={errorMessage}/> : null}  
      {/* ARTIST & LYRICS SECTION */}
      {(loading || errorMessage!=='') ? null : 
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Artist artist={artist}/>
            </div>
            <div className="col-md-6">
              <Song lyrics={lyrics}/>
            </div>
          </div>
        </div>}
    </Fragment>
  );
}

export default App;
