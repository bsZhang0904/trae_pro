import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">智享银龄</span>
        </Link>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">首页</Link>
            </li>
            <li className="nav-item">
              <Link to="/ai-chat" className="nav-link">智能助手</Link>
            </li>
            <li className="nav-item">
              <Link to="/life-services" className="nav-link">生活服务</Link>
            </li>
            <li className="nav-item">
              <Link to="/health" className="nav-link">健康管理</Link>
            </li>
            <li className="nav-item">
              <Link to="/social" className="nav-link">社交社区</Link>
            </li>
          </ul>
        </nav>
        
        {/* 移动端菜单按钮 */}
        <button className="mobile-menu-button">
          <div className="menu-icon">☰</div>
        </button>
      </div>
    </header>
  )
}

export default Header