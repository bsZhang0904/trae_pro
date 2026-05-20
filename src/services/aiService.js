// AI服务 - 为老年人提供智能助手功能
import { mockResponses } from './mockData'
import { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from '../utils/storage'

/**
 * 读取本地聊天记录
 * @returns {Array<{id: number, text: string, sender: 'user'|'bot'}>}
 */
export const getChatHistory = () => {
  return loadFromStorage(STORAGE_KEYS.AI_CHAT, [])
}

/**
 * 保存聊天记录到本地
 * @param {Array} messages 消息列表
 */
export const saveChatHistory = (messages) => {
  saveToStorage(STORAGE_KEYS.AI_CHAT, messages)
}

/**
 * 清空本地聊天记录
 */
export const clearChatHistory = () => {
  removeFromStorage(STORAGE_KEYS.AI_CHAT)
}

/**
 * 获取AI聊天回复
 * @param {string} message 用户输入的消息
 * @returns {Promise<string>} AI的回复内容
 */
export const getAIChatResponse = async (message) => {
  // 在实际应用中，这里应该调用真实的大语言模型API
  // 例如OpenAI的GPT API、百度的文心一言等
  
  // 模拟API调用延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      // 查找匹配的预设回复
      const lowerMessage = message.toLowerCase()
      let response = mockResponses.find(item => 
        lowerMessage.includes(item.keyword)
      )?.response
      
      // 如果没有找到匹配的预设回复，返回通用回复
      if (!response) {
        response = `感谢您的提问！我理解您的需求是："${message}"。\n\n` + 
          `这是一个很好的问题。在实际使用中，我们的智能助手会基于最新的大语言模型为您提供详细的解答。\n\n` +
          `您可以继续提问，我会尽力帮助您解决问题。`
      }
      
      resolve(response)
    }, 1000) // 模拟1秒的响应延迟
  })
}

/**
 * 生成简化手机使用指南
 * @param {string} phoneModel 手机型号
 * @param {string} feature 功能名称
 * @returns {Promise<string>} 简化的使用指南
 */
export const generateSimplifiedGuide = async (phoneModel, feature) => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      const guide = `以下是在${phoneModel}上使用${feature}的简化指南：\n\n` +
        `1. 首先打开手机主屏幕\n` +
        `2. 找到并点击"${feature}"应用图标\n` +
        `3. 在应用界面中，点击底部的相应按钮\n` +
        `4. 根据提示完成操作\n\n` +
        `如果您在操作过程中遇到困难，可以随时向我提问。`
      
      resolve(guide)
    }, 1000)
  })
}

/**
 * 分析用户问题并提供帮助
 * @param {string} question 用户的问题
 * @returns {Promise<{type: string, answer: string}>} 分析结果和回答
 */
export const analyzeAndHelp = async (question) => {
  // 模拟问题分析
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuestion = question.toLowerCase()
      
      let type = 'general'
      let answer = `关于您的问题"${question}"，我很乐意提供帮助。\n\n` +
        `在实际应用中，我们的智能助手会基于先进的大语言模型为您提供精准的解答。`
      
      // 判断问题类型
      if (lowerQuestion.includes('如何') || lowerQuestion.includes('怎么')) {
        type = 'how_to'
        answer = `我理解您想知道如何${question.replace('如何', '').replace('怎么', '')}。\n\n` +
          `这是一个操作指导类问题，我可以为您提供详细的步骤说明。`
      } else if (lowerQuestion.includes('天气')) {
        type = 'weather'
        answer = '关于天气的查询，您可以在生活服务页面查看最新的天气预报信息。'
      } else if (lowerQuestion.includes('健康') || lowerQuestion.includes('养生')) {
        type = 'health'
        answer = '关于健康养生的问题，建议您咨询专业医生的意见。同时，您也可以在健康管理页面查看相关健康知识。'
      }
      
      resolve({ type, answer })
    }, 1000)
  })
}