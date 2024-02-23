import { useEffect, useState } from 'react'
import './App.css'
import { SocketProvider } from './providers/Socket'
import { Route, Routes } from 'react-router-dom';
import { FirebaseProvider } from './providers/Firebase';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import AudioRecorder from './components/message/Audio';
function App() {

  return (
    <>
      <SocketProvider>
        <FirebaseProvider>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/chat' element={<Home/>} />
            <Route path='/room/:roomId' element={<AudioRecorder/>} />
          </Routes>
        </FirebaseProvider>
      </SocketProvider>
    </>
  )
}

export default App
