import React from 'react'
import DataFetchTable from './components/dataFetchTable';

import './App.css'

//import basic theme of primereact
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

