import React, { useState, useEffect } from 'react'
import './LifeServices.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import weatherIcon from '../assets/weather.svg'
import newsIcon from '../assets/news.svg'
import calendarIcon from '../assets/calendar.svg'
import { getWeatherData, getNewsData, getInterestRecommendations } from '../services/lifeService'

// 设置dayjs为中文
dayjs.locale('zh-cn')

function LifeServices() {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState([])
  const [interests, setInterests] = useState([])
  const [selectedDate, setSelectedDate] = useState(dayjs())
  
  // 获取数据
  useEffect(() => {
    loadData()
    
    // 每小时更新一次天气数据
    const weatherInterval = setInterval(() => {
      loadWeatherData()
    }, 3600000)
    
    return () => clearInterval(weatherInterval)
  }, [])
  
  const loadData = async () => {
    await Promise.all([
      loadWeatherData(),
      loadNewsData(),
      loadInterestRecommendations()
    ])
  }
  
  const loadWeatherData = async () => {
    try {
      const data = await getWeatherData()
      setWeather(data)
    } catch (error) {
      console.error('获取天气数据失败:', error)
    }
  }
  
  const loadNewsData = async () => {
    try {
      const data = await getNewsData()
      setNews(data)
    } catch (error) {
      console.error('获取新闻数据失败:', error)
    }
  }
  
  const loadInterestRecommendations = async () => {
    try {
      const data = await getInterestRecommendations()
      setInterests(data)
    } catch (error) {
      console.error('获取兴趣推荐失败:', error)
    }
  }
  
  // 日历导航
  const navigateDate = (days) => {
    setSelectedDate(selectedDate.add(days, 'day'))
  }
  
  // 生成日历天
  const generateCalendarDays = () => {
    const daysInMonth = selectedDate.daysInMonth()
    const firstDayOfMonth = selectedDate.startOf('month').day()
    const days = []
    
    // 添加上个月的填充天数
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day prev-month"></div>
      )
    }
    
    // 添加当前月的天数
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = selectedDate.date(i)
      const isToday = currentDate.isSame(dayjs(), 'day')
      const isSelected = currentDate.isSame(selectedDate, 'date')
      
      days.push(
        <div 
          key={i} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(currentDate)}
        >
          {i}
        </div>
      )
    }
    
    return days
  }
  
  return (
    <div className="life-services-container">
      <div className="life-services-header">
        <h1 className="page-title">生活服务</h1>
      </div>
      
      {/* 合并的天气和日历模块 */}
      <div className="weather-calendar-section card">
        <div className="section-header">
          <h2 className="section-title">
            <img src={weatherIcon} alt="天气日历" className="section-icon" />
            天气日历
          </h2>
        </div>
        
        <div className="weather-calendar-content">
          {/* 天气信息展示 */}
          {weather && (
            <div className="current-weather-info">
              <div className="weather-main">
                <span className="weather-temp-large">{weather.temperature.split('-')[0]}°C</span>
                <span className="weather-desc-large">{weather.weather}</span>
                <span className="weather-city">{weather.city}</span>
              </div>
              <div className="weather-extra">
                <span>湿度: {weather.humidity}</span>
                <span>风速: {weather.wind}</span>
                <span>空气质量: {weather.airQuality}</span>
              </div>
            </div>
          )}
          
          {/* 日历部分 */}
          <div className="calendar-simple">
            <div className="calendar-nav">
              <button className="nav-button-large" onClick={() => navigateDate(-1)}>‹</button>
              <h3 className="calendar-month-large">{selectedDate.format('YYYY年MM月')}</h3>
              <button className="nav-button-large" onClick={() => navigateDate(1)}>›</button>
            </div>
            
            <div className="calendar-weekdays">
              {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                <div key={day} className="weekday-large">{day}</div>
              ))}
            </div>
            
            <div className="calendar-grid">
              {generateCalendarDays()}
            </div>
            
            <div className="selected-date-info-large">
              <p>{selectedDate.format('YYYY年MM月DD日 dddd')}</p>
              {selectedDate.isSame(dayjs(), 'day') && (
                <p className="today-note">今天是个好日子！</p>
              )}
            </div>
          </div>
          
          {/* 天气预报摘要 */}
          {weather && (
            <div className="weather-forecast-brief">
              <h4>未来两天预报</h4>
              <div className="forecast-row">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="forecast-day-brief">
                    <div className="forecast-date">{day.day}</div>
                    <div className="forecast-temp">{day.temperature}</div>
                    <div className="forecast-desc">{day.weather}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 新闻部分 */}
      <div className="news-section card">
        <div className="section-header">
          <h2 className="section-title">
            <img src={newsIcon} alt="新闻" className="section-icon" />
            每日新闻
          </h2>
          <button className="refresh-button" onClick={loadNewsData}>刷新</button>
        </div>
        
        <div className="news-content">
          {news.length > 0 ? (
            <div className="news-list">
              {news.map((item, index) => (
                <div key={index} className="news-item">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-source">{item.source} · {item.time}</p>
                  <p className="news-summary">{item.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading">加载中...</div>
          )}
        </div>
      </div>
      
      {/* 兴趣推荐部分 */}
      <div className="interests-section card">
        <div className="section-header">
          <h2 className="section-title">为您推荐</h2>
          <button className="refresh-button" onClick={loadInterestRecommendations}>换一批</button>
        </div>
        
        <div className="interests-content">
          {interests.length > 0 ? (
            <div className="interests-grid">
              {interests.map((item, index) => (
                <div key={index} className="interest-card">
                  <div className="interest-category">{item.category}</div>
                  <h3 className="interest-title">{item.title}</h3>
                  <p className="interest-description">{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading">加载中...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LifeServices