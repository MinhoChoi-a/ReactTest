import React from 'react';

//Component: Genre list of movie detail

const GenreList = ({genre}) => {

    return (
            genre.map(gen => (
                    <li key={gen} className="li-content">
                       {gen}
                    </li>
                )) 
            )
}

export default GenreList