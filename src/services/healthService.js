// 健康服务相关的数据服务
import { mockHealthData, mockHealthSuggestions } from './mockData'

/**
 * 获取用户健康数据
 * @returns {Promise} 健康数据Promise
 */
export const getHealthData = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 实际项目中，这里应该调用真实的健康数据API
    // const response = await fetch('https://api.health.com/user-data')
    // return response.json()
    
    // 模拟检查今天是否签到
    const today = new Date().toISOString().split('T')[0]
    const isSignedInToday = mockHealthData.signInHistory.some(
      item => item.date === today
    )
    
    // 返回模拟数据
    return {
      ...mockHealthData,
      isSignedInToday
    }
  } catch (error) {
    console.error('获取健康数据失败:', error)
    // 返回默认模拟数据作为后备
    return {
      ...mockHealthData,
      isSignedInToday: false
    }
  }
}

/**
 * 每日签到
 * @returns {Promise} 签到结果Promise
 */
export const signInForToday = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 实际项目中，这里应该调用签到API
    // const response = await fetch('https://api.health.com/sign-in', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ date: new Date().toISOString() })
    // })
    // return response.json()
    
    // 模拟签到成功
    console.log('用户签到成功:', new Date().toISOString())
    
    return { success: true, message: '签到成功' }
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
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // 实际项目中，这里应该调用健康建议API
    // const response = await fetch('https://api.health.com/suggestions')
    // return response.json()
    
    // 返回模拟数据，随机选择一些建议
    const shuffled = [...mockHealthSuggestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
    
    return shuffled
  } catch (error) {
    console.error('获取健康建议失败:', error)
    // 返回默认模拟数据的一部分作为后备
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
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 实际项目中，这里应该调用记录健康数据API
    // const response = await fetch('https://api.health.com/record-data', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(healthData)
    // })
    // return response.json()
    
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
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 700))
    
    // 实际项目中，这里应该调用健康报告API
    // const response = await fetch(`https://api.health.com/report?period=${period}`)
    // return response.json()
    
    // 返回模拟的健康报告数据
    const report = {
      period,
      generatedAt: new Date().toISOString(),
      summary: {
        avgHealthScore: 82,
        totalSignIns: 25,
        avgSteps: 6500,
        avgSleepHours: 7.2
      },
      trends: {
        healthScore: [78, 80, 81, 83, 82],
        steps: [6000, 6200, 6800, 6500, 7000],
        sleep: [7.0, 7.1, 7.3, 7.2, 7.5]
      }
    }
    
    return report
  } catch (error) {
    console.error('获取健康报告失败:', error)
    return null
  }
}