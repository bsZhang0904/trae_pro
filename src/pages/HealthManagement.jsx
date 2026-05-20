import React, { useState, useEffect } from 'react'
import './HealthManagement.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import healthIcon from '../assets/health.svg'
import { getHealthData, signInForToday, getHealthSuggestions } from '../services/healthService'

// 设置dayjs为中文
dayjs.locale('zh-cn')

function HealthManagement() {
  const [healthData, setHealthData] = useState(null)
  const [isSignedInToday, setIsSignedInToday] = useState(false)
  const [signInHistory, setSignInHistory] = useState([])
  const [healthSuggestions, setHealthSuggestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [signingIn, setSigningIn] = useState(false)
  const [currentDate] = useState(dayjs())
  
  // 加载健康数据
  useEffect(() => {
    loadHealthData()
  }, [])
  
  const loadHealthData = async () => {
    try {
      setLoading(true)
      const data = await getHealthData()
      setHealthData(data)
      setIsSignedInToday(data.isSignedInToday)
      setSignInHistory(data.signInHistory)
      
      // 获取健康建议
      const suggestions = await getHealthSuggestions()
      setHealthSuggestions(suggestions)
    } catch (error) {
      console.error('加载健康数据失败:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // 每日签到
  const handleSignIn = async () => {
    if (isSignedInToday || signingIn) return
    
    try {
      setSigningIn(true)
      const result = await signInForToday()
      
      if (result.success) {
        setIsSignedInToday(true)
        // 使用服务层返回并已持久化的签到历史
        if (result.signInHistory) {
          setSignInHistory(result.signInHistory)
        } else if (result.record) {
          setSignInHistory(prev => [result.record, ...prev])
        }
        
        showToast('签到成功！祝您健康快乐！')
      } else {
        showToast('签到失败，请稍后再试', true)
      }
    } catch (error) {
      console.error('签到失败:', error)
      showToast('签到失败，请稍后再试', true)
    } finally {
      setSigningIn(false)
    }
  }
  
  // 显示提示信息
  const [toast, setToast] = useState({ show: false, message: '', isError: false })
  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError })
    setTimeout(() => {
      setToast({ show: false, message: '', isError: false })
    }, 3000)
  }
  
  // 计算连续签到天数
  const calculateConsecutiveDays = () => {
    if (!signInHistory || signInHistory.length === 0) return 0
    
    let count = 0
    let checkDate = currentDate
    
    // 检查今天是否签到
    const todaySignedIn = isSignedInToday || 
      signInHistory.some(item => item.date === checkDate.format('YYYY-MM-DD'))
    
    if (!todaySignedIn) {
      // 如果今天没签到，从昨天开始检查
      checkDate = checkDate.subtract(1, 'day')
    }
    
    // 计算连续天数
    while (true) {
      const checkDateStr = checkDate.format('YYYY-MM-DD')
      if (signInHistory.some(item => item.date === checkDateStr)) {
        count++
        checkDate = checkDate.subtract(1, 'day')
      } else {
        break
      }
    }
    
    return count
  }
  
  // 生成签到日历数据
  const generateSignInCalendar = () => {
    const year = currentDate.year()
    const month = currentDate.month()
    const daysInMonth = currentDate.daysInMonth()
    const firstDayOfMonth = currentDate.startOf('month').day()
    
    const calendar = []
    
    // 添加上个月的填充
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push({ date: null, isSignedIn: false })
    }
    
    // 添加当前月的天数
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = dayjs(`${year}-${month + 1}-${day}`).format('YYYY-MM-DD')
      const isSignedIn = signInHistory.some(item => item.date === dateStr)
      const isToday = day === currentDate.date()
      
      calendar.push({ 
        date: day, 
        isSignedIn, 
        isToday,
        dateStr 
      })
    }
    
    return calendar
  }
  
  const consecutiveDays = calculateConsecutiveDays()
  const calendarData = generateSignInCalendar()
  
  if (loading) {
    return (
      <div className="health-container">
        <div className="loading-container">
          <p className="loading-text">正在加载健康数据...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="health-container">
      <div className="health-header">
        <h1 className="page-title">健康管理</h1>
      </div>
      
      {/* 签到区域 */}
      <div className="sign-in-section card">
        <div className="sign-in-content">
          <div className="sign-in-left">
            <h2 className="section-title">
              <img src={healthIcon} alt="健康" className="section-icon" />
              每日签到
            </h2>
            <p className="sign-in-date">{currentDate.format('YYYY年MM月DD日 dddd')}</p>
            <p className="consecutive-days">连续签到 <span className="days-count">{consecutiveDays}</span> 天</p>
          </div>
          
          <button 
            className={`sign-in-button ${isSignedInToday ? 'signed-in' : ''}`}
            onClick={handleSignIn}
            disabled={isSignedInToday || signingIn}
          >
            {isSignedInToday ? '今日已签到' : signingIn ? '签到中...' : '立即签到'}
          </button>
        </div>
        
        {/* 签到日历 */}
        <div className="sign-in-calendar">
          <h3 className="calendar-title">本月签到记录</h3>
          <div className="calendar-weekdays">
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="calendar-grid">
            {calendarData.map((item, index) => (
              <div 
                key={index} 
                className={`calendar-day ${item.date ? '' : 'empty'} 
                  ${item.isSignedIn ? 'signed-in' : ''} 
                  ${item.isToday ? 'today' : ''}`}
              >
                {item.date && (
                  <div className="day-content">
                    <span className="day-number">{item.date}</span>
                    {item.isSignedIn && <span className="sign-mark">✓</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 健康数据区域 */}
      <div className="health-data-section card">
        <h2 className="section-title">健康概览</h2>
        
        <div className="health-stats">
          <div className="stat-card">
            <div className="stat-icon health-rate"></div>
            <div className="stat-content">
              <h3 className="stat-title">健康评分</h3>
              <p className="stat-value">{healthData && healthData.healthScore ? healthData.healthScore : 0}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon steps"></div>
            <div className="stat-content">
              <h3 className="stat-title">今日步数</h3>
              <p className="stat-value">{healthData && healthData.dailySteps ? healthData.dailySteps.toLocaleString() : 0}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon sleep"></div>
            <div className="stat-content">
              <h3 className="stat-title">睡眠时长</h3>
              <p className="stat-value">{healthData && healthData.sleepHours ? healthData.sleepHours : 0}小时</p>
            </div>
          </div>
        </div>
        
        <div className="health-progress">
          <div className="progress-item">
            <div className="progress-header">
              <span>活动目标</span>
              <span>{healthData && healthData.activityProgress ? healthData.activityProgress : 0}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${healthData && healthData.activityProgress ? healthData.activityProgress : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="progress-item">
            <div className="progress-header">
              <span>饮水目标</span>
              <span>{healthData && healthData.waterIntakeProgress ? healthData.waterIntakeProgress : 0}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill water" 
                style={{ width: `${healthData && healthData.waterIntakeProgress ? healthData.waterIntakeProgress : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 健康建议区域 */}
      <div className="health-suggestions-section card">
        <h2 className="section-title">健康建议</h2>
        
        <div className="suggestions-list">
          {healthSuggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-header">
                <div className="suggestion-icon" style={{ backgroundColor: suggestion.color }}>
                  {suggestion.icon}
                </div>
                <h3 className="suggestion-title">{suggestion.title}</h3>
              </div>
              <p className="suggestion-content">{suggestion.content}</p>
              <p className="suggestion-tip">{suggestion.tip}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 健康提醒区域 */}
      <div className="health-reminders-section card">
        <h2 className="section-title">今日提醒</h2>
        
        <div className="reminders-list">
          {healthData && healthData.dailyReminders ? healthData.dailyReminders.map((reminder, index) => (
            <div key={index} className="reminder-item">
              <div className="reminder-time">{reminder.time}</div>
              <div className="reminder-content">{reminder.content}</div>
              <div className="reminder-status" data-status={reminder.completed ? 'completed' : 'pending'}>
                {reminder.completed ? '已完成' : '待完成'}
              </div>
            </div>
          )) : null}
        </div>
      </div>
      
      {/* Toast提示 */}
      {toast.show && (
        <div className={`toast ${toast.isError ? 'error' : 'success'}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default HealthManagement