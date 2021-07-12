import React from 'react';

const CastingList = ({cast}) => {

    return (
        
            cast.map(casting => (
                    <li className="li-content">
                       {casting}
                    </li>
                )) 
            )
}

export default CastingList