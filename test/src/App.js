import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import DataFetchTable from './components/dataFetchTable';

import './App.css'

import '../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../node_modules/primereact/resources/primereact.min.css'
import '../node_modules/primeicons/primeicons.css'

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
          <DataFetchTable/>
      </header>
    </div>
  );
}

export default App;

