import React, { useState, useEffect, useRef } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

import { getAll } from '../utils/fetch'
import CastingList from './CastingList'
import GenreList from './GenreList'

import './dataFetchTable.css';

const DataFetchTable = () => {

    const URL = "https://skyit-coding-challenge.herokuapp.com/movies"
    const initialValueForMovie = { genre: ['none'], cast: ['none'], plot: 'none'}

    const [data, setData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(initialValueForMovie);
    const [cardVisible, setCardVisible] = useState(false)
    const cardVisibleChange = { display: cardVisible ? 'flex' : 'none' }    
    
    const cardVisibility = () => {
        setCardVisible(!cardVisible)
    }

    const [directors, setDirectors] = useState(["none"]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    useEffect(async () => {
        
        var dataList = await getAll(URL);

        setData(dataList);

        const deList = dataList.map(data => (
            data.director
        ))
        
        setDirectors([...new Set(deList)]);

      }, [])

      
    const dt = useRef(null);
    
    const onRowSelect = cardVisibility;
    


    const onRepresentativesChange = (e) => {
        dt.current.filter(e.value, 'director', 'in');
        setSelectedDirector(e.value);
    }

    const selectedDirectorsTemplate = (option) => {
        if (option) {
            return (
                
                    <span>{option}</span>
                
            );
        }

        return "Select Countries";
    }

    const representativesItemTemplate = (option) => {
    return (
        <div className="p-multiselect-director-option">
            <span>{option}</span>
        </div>
    );
    }


const representativeFilter = 
    <MultiSelect 
    value={selectedDirector} 
    options={directors} 
    itemTemplate={representativesItemTemplate} 
    onChange={(e) => onRepresentativesChange(e)}
    selectedItemTemplate={selectedDirectorsTemplate}     
    optionLabel="director" placeholder="All" className="p-column-filter" />;

//need to check
const cardHeader = <div className="cardTitle">
<div className="titleName"><h3 className="titleName">MOVIE DETAILS</h3></div>
<div className="closeButton"><Button icon="pi pi-times" className="p-button-secondary" onClick={cardVisibility}/></div>
</div>;

const cardFooter = <div className="cardFooter">
All movie data are from Wikipedia
</div>;

    //card data
    return (
            <div className="datatable-skyit">
                
                <div className="card">
                    <h1>Title</h1>
                    <DataTable ref={dt} value={data}
                        selection={selectedMovie}
                        paginator rows={10}
                        onRowSelect={onRowSelect}
                        onSelectionChange={e => setSelectedMovie(e.value)}
                        >
                        <Column selectionMode="single" style={{width:'3em'}}/>
                        <Column field="title" header="Title" filter filterPlaceholder="Search by name" />                        
                        <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" />
                        <Column field="length" header="Running TIme" filter filterPlaceholder="Search by year" />
                        <Column field="director" header="Director" filter filterElement={representativeFilter} />
                        <Column field="certification" header="Certification" filter filterPlaceholder="Search by year" />
                        <Column field="rating" header="Rating" filter filterPlaceholder="Search by year" />
                    </DataTable>
                </div>

                <div className="popup_detail" style={cardVisibleChange}>                    
                    <Card className="popup_card" title={cardHeader} footer={cardFooter}>                    
                        <div className="card-content">
                            <ul className="casting">
                                <span className="li-title">Cast:</span>
                                <CastingList cast={selectedMovie.cast}/>
                            </ul><br/>
                            <ul className="Genre">
                                <span className="li-title">Genre:</span>
                                <GenreList genre={selectedMovie.genre}/>
                            </ul>
                            <span className="li-title">Plot:</span>
                            <p>{selectedMovie.plot}</p>
                        </div>
                                          
                    </Card>
                </div>
            </div>
        );    
}

export default DataFetchTable