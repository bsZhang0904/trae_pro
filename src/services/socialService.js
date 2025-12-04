// 社交服务模块 - 为老年人提供社交交流功能

/**
 * 获取社交动态列表
 * @returns {Promise} 社交动态数据
 */
export const getSocialPosts = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟社交动态数据
  return [
    {
      id: 1,
      user: {
        name: '张阿姨',
        avatar: '👵',
        location: '北京'
      },
      content: '今天天气真好，和老伴一起去公园散步，看到了好多可爱的小朋友在玩耍。春天真是个美好的季节！',
      images: [],
      timestamp: '2024-04-10T09:30:00',
      likes: 24,
      comments: 5,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: '李爷爷',
        avatar: '👴',
        location: '上海'
      },
      content: '孙子教我用这个APP，现在我也能发动态了！今天在家做了红烧肉，味道不错，分享给大家。',
      images: [],
      timestamp: '2024-04-09T18:45:00',
      likes: 36,
      comments: 8,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: '王奶奶',
        avatar: '👵',
        location: '广州'
      },
      content: '参加社区的太极拳活动已经三个月了，感觉身体比以前好多了，推荐给各位老友！坚持锻炼真的很重要。',
      images: [],
      timestamp: '2024-04-09T10:20:00',
      likes: 42,
      comments: 12,
      isLiked: false
    },
    {
      id: 4,
      user: {
        name: '赵爷爷',
        avatar: '👴',
        location: '成都'
      },
      content: '今天和老伙计们一起下棋，输了两局赢了三局，心情不错！大家平时都有什么爱好呢？',
      images: [],
      timestamp: '2024-04-08T15:30:00',
      likes: 28,
      comments: 7,
      isLiked: false
    }
  ];
};

/**
 * 获取帖子评论列表
 * @param {number} postId - 帖子ID
 * @returns {Promise} 评论数据
 */
export const getComments = async (postId) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // 根据不同帖子ID返回不同的评论
  const commentsMap = {
    1: [
      {
        id: 101,
        user: {
          name: '李奶奶',
          avatar: '👵'
        },
        content: '是啊，春天的公园特别美！',
        timestamp: '2024-04-10T10:15:00'
      },
      {
        id: 102,
        user: {
          name: '王爷爷',
          avatar: '👴'
        },
        content: '我也喜欢去公园散步，空气好！',
        timestamp: '2024-04-10T11:20:00'
      }
    ],
    2: [
      {
        id: 201,
        user: {
          name: '陈阿姨',
          avatar: '👵'
        },
        content: '红烧肉看起来好香啊！能分享一下做法吗？',
        timestamp: '2024-04-09T19:30:00'
      },
      {
        id: 202,
        user: {
          name: '李爷爷',
          avatar: '👴'
        },
        content: '好的，下次发个详细的做法给大家！',
        timestamp: '2024-04-09T20:15:00'
      }
    ]
  };
  
  return commentsMap[postId] || [];
};

/**
 * 点赞/取消点赞帖子
 * @param {number} postId - 帖子ID
 * @param {boolean} isLiked - 是否点赞
 * @returns {Promise} 操作结果
 */
export const toggleLike = async (postId, isLiked) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    success: true,
    postId,
    isLiked,
    likesCount: isLiked ? 1 : -1 // 返回点赞数的变化
  };
};

/**
 * 发布评论
 * @param {number} postId - 帖子ID
 * @param {string} content - 评论内容
 * @returns {Promise} 操作结果
 */
export const postComment = async (postId, content) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // 生成模拟评论数据
  const newComment = {
    id: Date.now(), // 使用时间戳作为临时ID
    user: {
      name: '我',
      avatar: '😊'
    },
    content,
    timestamp: new Date().toISOString()
  };
  
  return {
    success: true,
    comment: newComment
  };
};

/**
 * 发布新动态
 * @param {string} content - 动态内容
 * @param {Array} images - 图片列表（暂时不实现图片上传功能）
 * @returns {Promise} 操作结果
 */
export const createPost = async (content, images = []) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 生成模拟动态数据
  const newPost = {
    id: Date.now(), // 使用时间戳作为临时ID
    user: {
      name: '我',
      avatar: '😊',
      location: '当前城市'
    },
    content,
    images,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    isLiked: false
  };
  
  return {
    success: true,
    post: newPost
  };
};

/**
 * 获取推荐好友列表
 * @returns {Promise} 推荐好友数据
 */
export const getRecommendedFriends = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟推荐好友数据
  return [
    {
      id: 101,
      name: '陈爷爷',
      avatar: '👴',
      location: '北京',
      commonInterests: ['下棋', '钓鱼'],
      age: 68
    },
    {
      id: 102,
      name: '刘奶奶',
      avatar: '👵',
      location: '上海',
      commonInterests: ['跳舞', '烹饪'],
      age: 65
    },
    {
      id: 103,
      name: '周爷爷',
      avatar: '👴',
      location: '广州',
      commonInterests: ['书法', '太极'],
      age: 72
    }
  ];
};

/**
 * 获取兴趣小组列表
 * @returns {Promise} 兴趣小组数据
 */
export const getInterestGroups = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟兴趣小组数据
  return [
    {
      id: 1,
      name: '太极拳爱好者',
      membersCount: 156,
      description: '一起交流太极拳技巧，分享练习心得',
      image: ''
    },
    {
      id: 2,
      name: '养生食谱分享',
      membersCount: 208,
      description: '分享适合老年人的健康食谱和养生之道',
      image: ''
    },
    {
      id: 3,
      name: '旅行见闻',
      membersCount: 132,
      description: '分享旅行照片和有趣的见闻',
      image: ''
    },
    {
      id: 4,
      name: '老年大学交流',
      membersCount: 187,
      description: '交流学习心得，分享学习资源',
      image: ''
    }
  ];
};