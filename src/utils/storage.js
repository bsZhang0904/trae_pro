/**
 * localStorage 读写封装，统一处理 JSON 解析异常
 */

export function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch (error) {
    console.error(`读取本地存储失败 [${key}]:`, error)
    return defaultValue
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`写入本地存储失败 [${key}]:`, error)
    return false
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`删除本地存储失败 [${key}]:`, error)
    return false
  }
}

export const STORAGE_KEYS = {
  HEALTH_SIGNIN: 'zhixiang_yinling_health_signin',
  SOCIAL_POSTS: 'zhixiang_yinling_social_posts',
  SOCIAL_COMMENTS: 'zhixiang_yinling_social_comments',
  AI_CHAT: 'zhixiang_yinling_ai_chat',
}
