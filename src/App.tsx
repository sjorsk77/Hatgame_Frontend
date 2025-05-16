import React, {Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {pages} from "./data/pages";
import {SignalRProvider} from "./SignalRContext";


function App() {
  return (
      <div className='flex md:px-20 flex-col min-h-screen bg-white font-montserrat'>
          <SignalRProvider>
              <Router>
                      <Suspense fallback={<div>Loading...</div>}>
                          <Routes>
                              {pages.map((page) => (
                                  <Route key={page.path} path={page.path} element={page.component} />
                                ))}
                          </Routes>
                    </Suspense>
              </Router>
          </SignalRProvider>
      </div>
  );
}

export default App;
