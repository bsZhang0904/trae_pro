import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { getSocialPosts, toggleLike, postComment, createPost, getComments, getRecommendedFriends, getInterestGroups } from '../services/socialService';
import './SocialCommunity.css';

// 配置dayjs
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const SocialCommunity = () => {
  // 状态管理
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  const [friends, setFriends] = useState([]);
  const [interestGroups, setInterestGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'friends', 'groups'
  
  // 发布框自动高度调整的ref
  const textareaRef = useRef(null);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 并行加载所有数据
        const [postsData, friendsData, groupsData] = await Promise.all([
          getSocialPosts(),
          getRecommendedFriends(),
          getInterestGroups()
        ]);
        setPosts(postsData);
        setFriends(friendsData);
        setInterestGroups(groupsData);
      } catch (error) {
        console.error('加载社交数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 处理点赞
  const handleLike = async (postId, isLiked) => {
    try {
      const result = await toggleLike(postId, !isLiked);
      if (result.success) {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, isLiked: !isLiked, likes: post.likes + result.likesCount }
              : post
          )
        );
      }
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };

  // 切换评论区
  const toggleComments = async (postId) => {
    const newExpanded = new Set(expandedComments);
    
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
      // 加载评论数据
      if (!comments[postId]) {
        try {
          const commentsData = await getComments(postId);
          setComments(prev => ({ ...prev, [postId]: commentsData }));
        } catch (error) {
          console.error('加载评论失败:', error);
        }
      }
    }
    
    setExpandedComments(newExpanded);
  };

  // 发布评论
  const handlePostComment = async (postId) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;
    
    try {
      const result = await postComment(postId, content);
      if (result.success) {
        // 更新评论列表
        setComments(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), result.comment]
        }));
        // 更新帖子评论数
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, comments: post.comments + 1 }
              : post
          )
        );
        // 清空评论输入
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      }
    } catch (error) {
      console.error('发布评论失败:', error);
    }
  };

  // 发布新动态
  const handleCreatePost = async () => {
    const content = newPostContent.trim();
    if (!content) return;
    
    try {
      const result = await createPost(content);
      if (result.success) {
        setPosts([result.post, ...posts]);
        setNewPostContent('');
        // 重置文本框高度
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    } catch (error) {
      console.error('发布动态失败:', error);
    }
  };

  // 处理评论输入变化
  const handleCommentChange = (postId, value) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  // 自动调整文本框高度
  const handleTextareaChange = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    setNewPostContent(e.target.value);
  };

  // 格式化时间
  const formatTime = (timestamp) => {
    return dayjs(timestamp).fromNow();
  };

  // 渲染发布框
  const renderPostCreator = () => (
    <div className="post-creator">
      <div className="avatar-circle">😊</div>
      <div className="post-input-container">
        <textarea
          ref={textareaRef}
          placeholder="分享你的生活点滴..."
          value={newPostContent}
          onChange={handleTextareaChange}
          className="post-textarea"
        />
        <button 
          className="post-button" 
          onClick={handleCreatePost}
          disabled={!newPostContent.trim()}
        >
          发布
        </button>
      </div>
    </div>
  );

  // 渲染动态列表
  const renderPosts = () => {
    if (loading) {
      return <div className="loading">加载中...</div>;
    }

    if (posts.length === 0) {
      return <div className="no-content">暂无动态，快来发布第一条吧！</div>;
    }

    return posts.map(post => (
      <div key={post.id} className="post">
        <div className="post-header">
          <div className="user-info">
            <div className="avatar-circle">{post.user.avatar}</div>
            <div className="user-details">
              <div className="user-name">{post.user.name}</div>
              <div className="post-time">{formatTime(post.timestamp)} · {post.user.location}</div>
            </div>
          </div>
        </div>
        
        <div className="post-content">
          {post.content}
        </div>
        
        {post.images.length > 0 && (
          <div className="post-images">
            {post.images.map((image, index) => (
              <img key={index} src={image} alt="Post image" />
            ))}
          </div>
        )}
        
        <div className="post-actions">
          <button 
            className={`action-button ${post.isLiked ? 'liked' : ''}`}
            onClick={() => handleLike(post.id, post.isLiked)}
          >
            {post.isLiked ? '❤️' : '🤍'} {post.likes}
          </button>
          <button 
            className="action-button"
            onClick={() => toggleComments(post.id)}
          >
            💬 {post.comments}
          </button>
        </div>
        
        {expandedComments.has(post.id) && (
          <div className="comments-section">
            <div className="comments-list">
              {(comments[post.id] || []).map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-avatar">{comment.user.avatar}</div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.user.name}</span>
                      <span className="comment-time">{formatTime(comment.timestamp)}</span>
                    </div>
                    <div className="comment-text">{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="comment-input-container">
              <input
                type="text"
                placeholder="写评论..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePostComment(post.id)}
                className="comment-input"
              />
              <button 
                onClick={() => handlePostComment(post.id)}
                disabled={!commentInputs[post.id]?.trim()}
                className="comment-button"
              >
                发送
              </button>
            </div>
          </div>
        )}
      </div>
    ));
  };

  // 渲染推荐好友
  const renderFriends = () => {
    if (loading) {
      return <div className="loading">加载中...</div>;
    }

    return (
      <div className="friends-list">
        {friends.map(friend => (
          <div key={friend.id} className="friend-card">
            <div className="friend-avatar">{friend.avatar}</div>
            <div className="friend-info">
              <div className="friend-name">{friend.name}</div>
              <div className="friend-age">{friend.age}岁 · {friend.location}</div>
              <div className="friend-interests">
                共同兴趣：{friend.commonInterests.join('、')}
              </div>
            </div>
            <button className="add-friend-button">添加好友</button>
          </div>
        ))}
      </div>
    );
  };

  // 渲染兴趣小组
  const renderInterestGroups = () => {
    if (loading) {
      return <div className="loading">加载中...</div>;
    }

    return (
      <div className="groups-grid">
        {interestGroups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-icon">👥</div>
            <h3 className="group-name">{group.name}</h3>
            <p className="group-description">{group.description}</p>
            <div className="group-members">{group.membersCount}位成员</div>
            <button className="join-group-button">加入小组</button>
          </div>
        ))}
      </div>
    );
  };

  // 渲染内容区域
  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="posts-section">
            {renderPostCreator()}
            {renderPosts()}
          </div>
        );
      case 'friends':
        return renderFriends();
      case 'groups':
        return renderInterestGroups();
      default:
        return renderPosts();
    }
  };

  return (
    <div className="social-community">
      <h1 className="page-title">社交社区</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          动态
        </button>
        <button 
          className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          好友
        </button>
        <button 
          className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          兴趣小组
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default SocialCommunity;