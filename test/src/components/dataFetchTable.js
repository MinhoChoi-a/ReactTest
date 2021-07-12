import React, { useState, useEffect, useRef } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

import { getAll } from '../utils/fetch'
import CastingList from './CastingList'
import GenreList from './GenreList'

import './css/dataFetchTable.css';

const DataFetchTable = () => {

    const URL = "https://skyit-coding-challenge.herokuapp.com/movies"

    const [data, setData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    const [cardVisible, setCardVisible] = useState(false)
    const cardVisibleChange = { display: cardVisible ? 'flex' : 'none' }    
    
    const [directors, setDirectors] = useState(["none"]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    const [certifications, setCertifications] = useState(["none"]);
    
    const [selectedStatus, setSelectedStatus] = useState(null);

    //this useEffect will be executed only when the component is rendered for the first time
    useEffect(() => {
        
        async function fetchData() {
            const dataList = await getAll(URL);

            //convert rating data
            dataList.forEach(element => {
            const rating = parseFloat(element.rating) * 20.00;    
            element.rating = rating.toFixed(2);
            });

            setData(dataList);

            //for the filter data
            const deList = dataList.map(data => (
                data.director
            ))
            
            const certList = dataList.map(data => (
                data.certification
            ))

            setDirectors([...new Set(deList)]);
            setCertifications([...new Set(certList)]);
            }

        fetchData();

      }, [])


    const dt = useRef(null);    

    
    //manage pop-up card for movie detail

    const cardVisibility = () => {
        setCardVisible(!cardVisible);        
    }

    const cardOn = (e) => {
        //to prevent the null data error of selectedMovie
        if(!cardVisible) {
            setSelectedMovie(e.value);
        }
        return;
    }

    const onRowSelect = () => {  
        setCardVisible(!cardVisible);
    }
    
    const onRowUnSelect = () => {
        //to prevent the null data error of selectedMovie  
        setCardVisible(false);
    }

    //manage customized filter for directors

    const onDirectorsChange = (e) => {
        dt.current.filter(e.value, 'director', 'in');
        setSelectedDirector(e.value);
    }

    const selectedDirectorsTemplate = (option) => {
        if (option) {
            return (
                    <span>{option},</span>
            );
        }
        return "All";
    }

    const directorsItemTemplate = (option) => {
    return (
        <div className="p-multiselect-director-option">
            <span>{option}</span>
        </div>
    );
    }

    const directorFilter = <MultiSelect 
        value={selectedDirector} 
        options={directors} 
        itemTemplate={directorsItemTemplate} 
        onChange={(e) => onDirectorsChange(e)}
        selectedItemTemplate={selectedDirectorsTemplate}     
        optionLabel="director" placeholder="All" className="p-column-filter" />;

    
    //manage customized filter for status
        
    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'certification', 'equals');
        setSelectedStatus(e.value);
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge certification-${option.replace(/\s/g, '')}`}>{option.toUpperCase()}</span>;
    }

    const statusFilter = <Dropdown 
        value={selectedStatus} 
        options={certifications} 
        onChange={onStatusChange} 
        itemTemplate={statusItemTemplate} 
        placeholder="Select a Status" className="p-column-filter" showClear />;

    
    //manage customized rating data
    const ratingBodyTemplate = (rowData) => {
        
        return (
            <React.Fragment>
                {rowData.rating}%
            </React.Fragment>
        );
    }

    //manage customized certification data    
    const certificationBodyTemplate = (rowData) => {

        const certification = (rowData.certification).replace(/\s/g, '');
        var certiClass = ""

        if(certification === "General") {
            certiClass = `customer-badge certification-${certification}`
        }

        else if(certification ==="CA-PG") {
            certiClass = `customer-badge certification-${certification}`
        }

        else if(certification === "14Accompaniment") {
            certiClass = `customer-badge certification-${certification}`
        }

        return (
            <React.Fragment>
                <div className={certiClass}>{(rowData.certification).toUpperCase()}</div>
            </React.Fragment>
        );
    }


    //manage pop-up card layout for the movie detail
    const cardHeader = 
        <div className="cardTitle">
            <div className="titleName">
                <h3 className="titleName">MOVIE DETAILS</h3></div>
            <div className="closeButton">
                <Button icon="pi pi-times" className="p-button-rounded p-button-outlined" onClick={cardVisibility}/></div>
        </div>;

    const cardFooter = "All movie data are from Wikipedia and IMDb.";

    //render condition: I used if statement to avoid the null data exception for pop-up card

    if(cardVisible) {

        return (
                <div className="datatable-skyit">
                    <div className="table">
                        <h2>Favorite Movie List</h2>
                        <DataTable ref={dt} value={data}
                            selection={selectedMovie}
                            paginator rows={10}
                            onRowSelect={onRowSelect}
                            onRowUnselect={onRowUnSelect}
                            onSelectionChange={e => cardOn(e)}
                            dataKey="title"
                            >
                            <Column selectionMode="single" style={{width:'3em'}}/>
                            <Column field="title" header="Title" filter filterPlaceholder="Search by title" />                        
                            <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" />
                            <Column field="length" header="Running TIme" filter filterPlaceholder="Search by time" />
                            <Column field="director" header="Director" filter filterElement={directorFilter} />
                            <Column field="certification" header="Certification" body={certificationBodyTemplate} filter filterPlaceholder="Select a status" filterElement={statusFilter}/>
                            <Column field="rating" header="Rating" body={ratingBodyTemplate} filter filterPlaceholder="Search by rating" />
                        </DataTable>
                    </div>

                    <div className="popup_detail" style={cardVisibleChange}>                    
                        <Card className="popup_card" title={cardHeader} footer={cardFooter}>                    
                            
                                <h1>{selectedMovie.title}</h1>
                                <h4>Directed by {selectedMovie.director}</h4>
                                
                                <ul className="casting">
                                    <span className="li-title">Cast:</span>
                                    <CastingList cast={selectedMovie.cast}/>
                                </ul>
                                <ul className="genre">
                                    <span className="li-title">Genre:</span>
                                    <GenreList genre={selectedMovie.genre}/>
                                </ul>
                                <ul className="li-title">Plot:</ul>
                                <p>{selectedMovie.plot}</p>
                        </Card>
                    </div>
                </div>
            ); 

        }

        return (
            <div className="datatable-skyit">
                    <div className="table">
                        <h2>Favorite Movie List</h2>
                        <DataTable ref={dt} value={data}
                            selection={selectedMovie}
                            paginator rows={10}
                            onRowSelect={onRowSelect}
                            onRowUnselect={onRowUnSelect}
                            onSelectionChange={e => cardOn(e)}
                            dataKey="title"
                            >
                            <Column selectionMode="single" style={{width:'3em'}}/>
                            <Column field="title" header="Title" filter filterPlaceholder="Search by title" />                        
                            <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" />
                            <Column field="length" header="Running TIme" filter filterPlaceholder="Search by time" />
                            <Column field="director" header="Director" filter filterElement={directorFilter} />
                            <Column field="certification" header="Certification" body={certificationBodyTemplate} filter filterPlaceholder="Select a status" filterElement={statusFilter}/>
                            <Column field="rating" header="Rating" body={ratingBodyTemplate} filter filterPlaceholder="Search by rating" />
                        </DataTable>
                    </div>
                </div>
        )
  }

export default DataFetchTable