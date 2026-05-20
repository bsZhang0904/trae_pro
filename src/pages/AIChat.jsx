import React, { useState, useRef, useEffect } from 'react'
import './AIChat.css'
import { getAIChatResponse, getChatHistory, saveChatHistory, clearChatHistory } from '../services/aiService'

function AIChat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const chatEndRef = useRef(null)
  
  // 示例的常用问题，方便老年人快速提问
  const commonQuestions = [
    '如何使用微信发语音消息？',
    '今天天气怎么样？',
    '如何设置手机闹钟？',
    '老年人应该如何保持健康？',
    '教我使用支付宝扫码付款',
    '如何查询公交路线？'
  ]
  
  // 加载本地聊天记录
  useEffect(() => {
    const saved = getChatHistory()
    if (saved.length > 0) {
      setMessages(saved)
    }
    setHistoryLoaded(true)
  }, [])

  // 聊天记录变化时写入本地存储
  useEffect(() => {
    if (historyLoaded) {
      saveChatHistory(messages)
    }
  }, [messages, historyLoaded])

  // 滚动到聊天底部
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 清空聊天记录
  const handleClearHistory = () => {
    if (messages.length === 0) return
    if (window.confirm('确定要清空所有聊天记录吗？')) {
      clearChatHistory()
      setMessages([])
    }
  }
  
  // 发送消息
  const sendMessage = async (message) => {
    if (!message.trim()) return
    
    // 添加用户消息
    const userMessage = { id: Date.now(), text: message, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    
    // 获取AI回复
    try {
      const aiResponse = await getAIChatResponse(message)
      const botMessage = { id: Date.now() + 1, text: aiResponse, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('获取AI回复失败:', error)
      const errorMessage = {
        id: Date.now() + 1, 
        text: '抱歉，我暂时无法回答这个问题。请稍后再试。', 
        sender: 'bot'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }
  
  // 处理输入框提交
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }
  
  // 快捷提问
  const handleQuickQuestion = (question) => {
    sendMessage(question)
  }
  
  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="ai-chat-header-row">
          <div>
            <h1 className="ai-chat-title">智能助手</h1>
            <p className="ai-chat-subtitle">有什么可以帮助您的吗？</p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              className="clear-history-button secondary-button"
              onClick={handleClearHistory}
              disabled={isTyping}
            >
              清空记录
            </button>
          )}
        </div>
      </div>
      
      <div className="ai-chat-content">
        {/* 快捷提问区域 */}
        <div className="quick-questions">
          <h3 className="quick-questions-title">常用问题</h3>
          <div className="quick-questions-list">
            {commonQuestions.map((question, index) => (
              <button 
                key={index} 
                className="quick-question-button"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        {/* 聊天消息区域 */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-chat">
              <p>开始与智能助手对话吧！</p>
            </div>
          )}
          
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">{message.text}</div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
        
        {/* 输入区域 */}
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <textarea
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="请输入您的问题..."
            rows={3}
          />
          <button 
            type="submit" 
            className="send-button primary-button"
            disabled={isTyping}
          >
            发送
          </button>
        </form>
      </div>
    </div>
  )
}

export default AIChat