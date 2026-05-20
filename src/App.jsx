import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AIChat from './pages/AIChat'
import LifeServices from './pages/LifeServices'
import HealthManagement from './pages/HealthManagement'
import SocialCommunity from './pages/SocialCommunity'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/life-services" element={<LifeServices />} />
          <Route path="/health" element={<HealthManagement />} />
          <Route path="/social" element={<SocialCommunity />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App