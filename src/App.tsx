import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Join} from "./Pages/Join";
import {Games} from "./Pages/Games";
import LobbyPage from "./Pages/LobbyPage";
import {Create} from "./Pages/Create";
import {Admin} from "./Pages/Admin";
import {Authenticate} from "./Pages/Authenticate";
import {SignalRProvider} from "./SignalRContext";


function App() {
  return (
      <SignalRProvider>
          <Router>
              <Routes>
                  <Route path={"/"} element={<Games/>}/>
                  <Route path={"join/:gameId"} element={<Join/>}/>
                  <Route path={"lobby/:gameId"} element={<LobbyPage/>}/>
                  <Route path={"create"} element={<Create/>}/>
                  <Route path={"admin"} element={<Admin/>}/>
                  <Route path={"auth"} element={<Authenticate/>}/>
                    <Route path={"*"} element={<Navigate to={"/"}/>}/>
              </Routes>
          </Router>
      </SignalRProvider>
  );
}

export default App;
