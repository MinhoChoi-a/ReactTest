import React from 'react';

const GenreList = ({genre}) => {

    return (
        
            genre.map(gen => (
                    <li className="li-content">
                       {gen}
                    </li>
                )) 
            )
}

export default GenreList