// 健康服务相关的数据服务
import dayjs from 'dayjs'
import { mockHealthData, mockHealthSuggestions } from './mockData'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'

/**
 * 从本地存储加载签到历史，首次使用时以 Mock 数据为初始种子
 */
function loadSignInHistory() {
  const stored = loadFromStorage(STORAGE_KEYS.HEALTH_SIGNIN, null)
  if (stored !== null) return stored
  return [...mockHealthData.signInHistory]
}

/**
 * 持久化签到历史
 */
function persistSignInHistory(history) {
  saveToStorage(STORAGE_KEYS.HEALTH_SIGNIN, history)
}

/**
 * 获取用户健康数据
 * @returns {Promise} 健康数据Promise
 */
export const getHealthData = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const signInHistory = loadSignInHistory()
    const today = dayjs().format('YYYY-MM-DD')
    const isSignedInToday = signInHistory.some(item => item.date === today)

    return {
      ...mockHealthData,
      signInHistory,
      isSignedInToday,
      healthScore: 82,
      dailySteps: mockHealthData.currentHealth?.steps ?? 5832,
      sleepHours: mockHealthData.currentHealth?.sleepHours ?? 7.5,
      activityProgress: Math.min(
        100,
        Math.round(((mockHealthData.currentHealth?.steps ?? 0) / (mockHealthData.healthGoals?.steps ?? 8000)) * 100)
      ),
      waterIntakeProgress: 65,
      dailyReminders: [
        { time: '08:00', content: '服用降压药', completed: false },
        { time: '14:00', content: '测量并记录血压', completed: false },
        { time: '17:30', content: '傍晚散步 30 分钟', completed: true },
        { time: '22:30', content: '准备休息，保持充足睡眠', completed: false },
      ],
    }
  } catch (error) {
    console.error('获取健康数据失败:', error)
    return {
      ...mockHealthData,
      signInHistory: loadSignInHistory(),
      isSignedInToday: false,
    }
  }
}

/**
 * 每日签到
 * @returns {Promise} 签到结果Promise
 */
export const signInForToday = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800))

    const today = dayjs().format('YYYY-MM-DD')
    const time = dayjs().format('HH:mm:ss')
    const history = loadSignInHistory()

    if (history.some(item => item.date === today)) {
      return { success: false, message: '今日已签到' }
    }

    const newRecord = { date: today, time }
    const updatedHistory = [newRecord, ...history]
    persistSignInHistory(updatedHistory)

    return {
      success: true,
      message: '签到成功',
      record: newRecord,
      signInHistory: updatedHistory,
    }
  } catch (error) {
    console.error('签到失败:', error)
    return { success: false, message: '签到失败，请稍后重试' }
  }
}

/**
 * 获取健康建议
 * @returns {Promise} 健康建议数据Promise
 */
export const getHealthSuggestions = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600))

    const shuffled = [...mockHealthSuggestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)

    return shuffled
  } catch (error) {
    console.error('获取健康建议失败:', error)
    return mockHealthSuggestions.slice(0, 4)
  }
}

/**
 * 记录健康数据
 * @param {Object} healthData - 健康数据对象
 * @returns {Promise} 操作结果Promise
 */
export const recordHealthData = async (healthData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('记录健康数据:', healthData)
    return { success: true }
  } catch (error) {
    console.error('记录健康数据失败:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 获取健康报告
 * @param {string} period - 报告周期 (week, month, year)
 * @returns {Promise} 健康报告数据Promise
 */
export const getHealthReport = async (period = 'month') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700))

    const signInHistory = loadSignInHistory()

    const report = {
      period,
      generatedAt: new Date().toISOString(),
      summary: {
        avgHealthScore: 82,
        totalSignIns: signInHistory.length,
        avgSteps: 6500,
        avgSleepHours: 7.2,
      },
      trends: {
        healthScore: [78, 80, 81, 83, 82],
        steps: [6000, 6200, 6800, 6500, 7000],
        sleep: [7.0, 7.1, 7.3, 7.2, 7.5],
      },
    }

    return report
  } catch (error) {
    console.error('获取健康报告失败:', error)
    return null
  }
}
