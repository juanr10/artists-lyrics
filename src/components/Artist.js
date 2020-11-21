import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name: Artist. 
 * @description: Component to display the artist data.
 * @param: Artist object.
 * @return: Formatted artist data view.
 */
const Artist = ({artist}) => {
    if(Object.keys(artist).length === 0) return null;

    const {strArtist, strArtistThumb, strGenre, strBiographyES, strFacebook, strTwitter, strLastFMChart} = artist;
    const NoBiography='Biografía no disponible en este momento.';

    return (
        <div className="card border-light">
            <div className="card-header bg-primary text-light font-weight-bold text-center">
                {strArtist}
            </div>
            <div className="card-body">
                {/* GENERAL DATA */}
                <img src={strArtistThumb} alt="logo-artist" />
                <p className="card-text">G&eacute;nero: {strGenre}.</p>
                <h2 className="card-text">Biograf&iacute;a:</h2>
                <p className="card-text text-justify">{
                    (strBiographyES===null) ? NoBiography : strBiographyES           
                }</p>
                
                {/* SOCIAL MEDIA LINKS */}
                <p className="card-text">          
                    <a href={`https://${strFacebook}`} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href={`https://${strTwitter}`} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href={`${strLastFMChart}`} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-lastfm"></i>
                    </a>
                </p>
            </div>
        </div>
    );
};

Artist.propTypes = {
    artist: PropTypes.object.isRequired
}

export default Artist;