import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 * @name: Song.
 * @description: Component to display the song lyrics.
 * @param: lyrics.
 * @return: Formatted lyrics view.
 */
const Song = ({lyrics}) => {
    if(lyrics === '') return null;
    return (
        <Fragment>
            <h2>Letra</h2>
            <p className="lyrics">{lyrics}</p>
        </Fragment>
    );
};

Song.propTypes = {
    lyrics: PropTypes.string.isRequired
}


export default Song;