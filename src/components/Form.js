import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

/**
 * @name: Form.
 * @description: Component to display the form where the user can perform the search.
 * @param: Function to update the state "searchLyrics" of the main component.
 * @return: Form view.
 */
const Form = ({saveSearchLyrics}) => {
    const [search, saveSearch] = useState({
        artist: '',
        song: ''
    });
    const {artist, song} = search;
    //Error flag
    const [error, saveError] = useState(false);

    //Updates the state according to the changes of each input
    const updateState = e => {
        saveSearch({
            ...search,
            [e.target.name]:e.target.value
        })
    }
    
    //Submit management
    const searchData = e =>{
        e.preventDefault();
        if(artist.trim() === '' || song.trim() === ''){
            saveError(true);
            return;     
        } 
        //Pass data to the main component
        saveSearchLyrics(search); 
        //Clean errors
        saveError(false);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <form
                        className="col card mb-5 pt-5 pb-2"
                        onSubmit={searchData}
                    >
                        <fieldset>
                            <legend className="text-center">Lyrics.ovh & TheAudioDB's API</legend>
                            <legend className="text-center"><small className="text-muted">Busca un artista y la letra de una canci&oacute;n</small></legend>
                            <div className="row">
                                {/* ARTIST FIELD */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artist"
                                            placeholder="Nombre del artista"
                                            onChange={updateState}
                                            value={artist}
                                        />
                                    </div>
                                </div>
                                {/* SONG FIELD */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canci&oacute;n</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="song"
                                            placeholder="Nombre de la canción"
                                            onChange={updateState}
                                            value={song}
                                        />
                                    </div>
                                </div> 
                            </div>
                            {/* BUTTON */}
                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                        {/* ERROR SECTION */}
                        {error ? <Error message="Todos los campos son obligatorios" /> : null}
                    </form>
                </div>
            </div>
        </div>
    );
};

Form.propTypes = {
    saveSearchLyrics: PropTypes.func.isRequired
}

export default Form;