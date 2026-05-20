// 生活服务相关的数据服务
import { mockWeatherData, mockNewsData, mockInterestRecommendations } from './mockData'

/**
 * 获取天气数据
 * @returns {Promise} 天气数据Promise
 */
export const getWeatherData = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 实际项目中，这里应该调用真实的天气API
    // const response = await fetch('https://api.weather.com/...')
    // return response.json()
    
    // 返回模拟数据
    return mockWeatherData
  } catch (error) {
    console.error('获取天气数据失败:', error)
    // 返回默认模拟数据作为后备
    return mockWeatherData
  }
}

/**
 * 获取新闻数据
 * @returns {Promise} 新闻数据Promise
 */
export const getNewsData = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 实际项目中，这里应该调用真实的新闻API
    // const response = await fetch('https://api.news.com/...')
    // return response.json()
    
    // 返回模拟数据
    return mockNewsData
  } catch (error) {
    console.error('获取新闻数据失败:', error)
    // 返回默认模拟数据作为后备
    return mockNewsData
  }
}

/**
 * 获取兴趣推荐数据
 * @returns {Promise} 兴趣推荐数据Promise
 */
export const getInterestRecommendations = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // 实际项目中，这里应该调用推荐系统API
    // const response = await fetch('https://api.recommendations.com/...')
    // return response.json()
    
    // 返回模拟数据，随机选择一些推荐
    const shuffled = [...mockInterestRecommendations]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
    
    return shuffled
  } catch (error) {
    console.error('获取兴趣推荐失败:', error)
    // 返回默认模拟数据的一部分作为后备
    return mockInterestRecommendations.slice(0, 6)
  }
}

/**
 * 根据日期获取日历事件
 * @param {string} date - 日期字符串
 * @returns {Promise} 日历事件数据Promise
 */
export const getCalendarEvents = async (date) => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // 实际项目中，这里应该调用日历API
    // 目前返回空数组作为模拟
    return []
  } catch (error) {
    console.error('获取日历事件失败:', error)
    return []
  }
}

/**
 * 记录用户兴趣选择
 * @param {string} interestId - 兴趣ID
 * @returns {Promise} 操作结果Promise
 */
export const recordUserInterest = async (interestId) => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 实际项目中，这里应该调用用户兴趣记录API
    console.log('用户选择了兴趣:', interestId)
    return { success: true }
  } catch (error) {
    console.error('记录用户兴趣失败:', error)
    return { success: false, error: error.message }
  }
}