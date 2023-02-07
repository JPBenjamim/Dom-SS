import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { createServer } from 'miragejs';

const server = createServer({
  routes() {
    this.namespace = 'api';

    this.get("/providers", () => {
      return {
        
              name: 'Danone',
              hour: '2023-01-20T20:54:08.000Z',
              idNotes: '10101',
              idWorkDay: '',
              quantity: '4',
              isConfirmedByHeritage: false,
              isConfirmedByCPD: false,
              isConfirmedByArbitrator: false,
              loadType: 'fria',
              volumeType: 'pallet',
              isChecked: false,
              isReturned: false,
              isSchedule: 'sim',
              idDriver: '',
            
          
        
      };
    });
  },
});
server.logging = true;

export default server;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
