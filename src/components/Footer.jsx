import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">智享银龄</h3>
            <p className="footer-description">智享银龄 - AI+养老综合服务平台，为老年人提供生活照料与情感陪伴</p>
          </div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">关于我们</a>
            <a href="#" className="footer-link">使用帮助</a>
            <a href="#" className="footer-link">联系我们</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2024 智享银龄 版权所有</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer