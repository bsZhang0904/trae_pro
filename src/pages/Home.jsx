import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import weatherIcon from '../assets/weather.svg'
import newsIcon from '../assets/news.svg'
import healthIcon from '../assets/health.svg'
import socialIcon from '../assets/social.svg'
import aiIcon from '../assets/ai.svg'

// 设置dayjs为中文
dayjs.locale('zh-cn')

function Home() {
  const [currentTime, setCurrentTime] = useState(dayjs())
  const [greeting, setGreeting] = useState('')
  
  // 更新当前时间和问候语
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs())
    }, 60000) // 每分钟更新一次
    
    updateGreeting()
    
    return () => clearInterval(timer)
  }, [])
  
  // 根据时间设置问候语
  const updateGreeting = () => {
    const hour = dayjs().hour()
    if (hour < 6) {
      setGreeting('凌晨好')
    } else if (hour < 12) {
      setGreeting('早上好')
    } else if (hour < 14) {
      setGreeting('中午好')
    } else if (hour < 18) {
      setGreeting('下午好')
    } else {
      setGreeting('晚上好')
    }
  }
  
  // 服务卡片数据
  const services = [
    {
      id: 'ai',
      title: '智能助手',
      description: '为您解答问题，提供帮助',
      icon: aiIcon,
      route: '/ai-chat',
      color: '#4a90e2'
    },
    {
      id: 'life',
      title: '生活服务',
      description: '新闻、天气、兴趣推荐',
      icon: weatherIcon,
      route: '/life-services',
      color: '#7ed321'
    },
    {
      id: 'health',
      title: '健康管理',
      description: '每日签到，健康记录',
      icon: healthIcon,
      route: '/health',
      color: '#f5a623'
    },
    {
      id: 'social',
      title: '社交社区',
      description: '交流分享，记录生活',
      icon: socialIcon,
      route: '/social',
      color: '#d0021b'
    }
  ]
  
  return (
    <div className="home-container">
      {/* 问候和日期区域 */}
      <section className="greeting-section">
        <div className="greeting-content">
          <h1 className="greeting-text">{greeting}，欢迎使用智享银龄</h1>
          <p className="date-text">
            {currentTime.format('YYYY年MM月DD日')} {currentTime.format('dddd')}
          </p>
          <p className="time-text">{currentTime.format('HH:mm')}</p>
        </div>
      </section>
      
      {/* 快捷服务区域 */}
      <section className="quick-services">
        <h2 className="section-title">快捷服务</h2>
        <div className="services-grid">
          {services.map(service => (
            <Link 
              key={service.id} 
              to={service.route} 
              className="service-card"
              style={{ borderTopColor: service.color }}
            >
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* 今日概览区域 */}
      <section className="today-overview">
        <h2 className="section-title">今日概览</h2>
        <div className="overview-cards">
          {/* 天气卡片 */}
          <div className="overview-card weather-card">
            <div className="card-header">
              <h3>今日天气</h3>
              <img src={weatherIcon} alt="天气" className="card-icon" />
            </div>
            <div className="weather-info">
              <div className="weather-temp">22°C</div>
              <div className="weather-desc">晴天 · 微风</div>
            </div>
            <Link to="/life-services" className="card-link">查看详情</Link>
          </div>
          
          {/* 健康卡片 */}
          <div className="overview-card health-card">
            <div className="card-header">
              <h3>健康提醒</h3>
              <img src={healthIcon} alt="健康" className="card-icon" />
            </div>
            <div className="health-info">
              <p>今日尚未签到</p>
              <button className="sign-in-button primary-button">
                立即签到
              </button>
            </div>
            <Link to="/health" className="card-link">健康管理</Link>
          </div>
          
          {/* 新闻卡片 */}
          <div className="overview-card news-card">
            <div className="card-header">
              <h3>今日新闻</h3>
              <img src={newsIcon} alt="新闻" className="card-icon" />
            </div>
            <div className="news-info">
              <p className="news-title">国家发布新的养老政策，多项福利惠及老年人</p>
              <p className="news-source">来源：央视新闻</p>
            </div>
            <Link to="/life-services" className="card-link">更多新闻</Link>
          </div>
        </div>
      </section>
      
      {/* 温馨提示区域 */}
      <section className="tips-section">
        <h2 className="section-title">温馨提示</h2>
        <div className="tips-content">
          <p className="tip-text">
            💡 今日气温适宜，适合外出散步。记得随身携带水杯，及时补充水分。
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home