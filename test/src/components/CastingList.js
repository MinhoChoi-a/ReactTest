import React from 'react';

//Component: Casting list of movie detail

const CastingList = ({cast}) => {

    return (
            cast.map(casting => (
                    <li key={casting} className="li-content">
                       {casting}
                    </li>
                )) 
            )
}

export default CastingList