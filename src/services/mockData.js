// Mock数据 - 为老年人提供常见问题的预设回复

/**
 * 模拟天气数据
 */
export const mockWeatherData = {
  city: '北京',
  date: new Date().toLocaleDateString(),
  weather: '晴',
  temperature: '18-26°C',
  description: '今天天气晴朗，适合外出活动',
  wind: '微风 3级',
  humidity: '45%',
  airQuality: '优',
  forecast: [
    { day: '明天', weather: '多云', temperature: '16-24°C' },
    { day: '后天', weather: '小雨', temperature: '14-20°C' }
  ]
};

/**
 * 模拟新闻数据
 */
export const mockNewsData = [
  {
    id: 1,
    title: '老年人健康讲座下月在社区举行',
    source: '社区新闻',
    time: '2小时前',
    content: '社区将在下月举办健康知识讲座，邀请专家讲解老年人常见疾病预防和健康生活方式...',
    category: '社区'
  },
  {
    id: 2,
    title: '公交推出老年卡新优惠政策',
    source: '城市交通',
    time: '昨天',
    content: '市公交集团宣布，即日起65岁以上老年人乘坐公交车将享受更多优惠，详情请咨询公交服务热线...',
    category: '出行'
  },
  {
    id: 3,
    title: '春季养生食谱推荐',
    source: '健康生活',
    time: '2天前',
    content: '春季是养生的好时节，推荐几款适合老年人的养生食谱，清淡易消化，营养均衡...',
    category: '健康'
  },
  {
    id: 4,
    title: '老年人智能手机使用培训课程报名中',
    source: '老年大学',
    time: '3天前',
    content: '老年大学新开设智能手机使用培训课程，教授基础操作、微信使用、网上挂号等实用技能...',
    category: '学习'
  },
  {
    id: 5,
    title: '公园增设老年人健身设施',
    source: '市政新闻',
    time: '4天前',
    content: '市中区公园近日完成改造，增设了多套适合老年人的健身器材，方便老年人日常锻炼...',
    category: '休闲'
  }
];

/**
 * 模拟兴趣推荐数据
 */
export const mockInterestRecommendations = [
  {
    id: 1,
    title: '太极拳基础课程',
    type: '运动',
    description: '适合初学者的太极拳课程，有助于增强体质',
    image: ''
  },
  {
    id: 2,
    title: '书法鉴赏与练习',
    type: '艺术',
    description: '学习书法基础知识，提高艺术修养',
    image: ''
  },
  {
    id: 3,
    title: '中医养生讲座',
    type: '健康',
    description: '了解中医养生理念，学习实用养生方法',
    image: ''
  },
  {
    id: 4,
    title: '手工编织班',
    type: '手工艺',
    description: '学习编织技巧，制作精美手工艺品',
    image: ''
  },
  {
    id: 5,
    title: '经典电影赏析',
    type: '娱乐',
    description: '欣赏经典老电影，分享观影感受',
    image: ''
  },
  {
    id: 6,
    title: '花鸟鱼虫养殖',
    type: '兴趣',
    description: '学习养花鸟鱼虫的技巧，丰富生活',
    image: ''
  },
  {
    id: 7,
    title: '家常菜烹饪班',
    type: '美食',
    description: '学习制作营养美味的家常菜',
    image: ''
  },
  {
    id: 8,
    title: '摄影基础入门',
    type: '艺术',
    description: '学习手机摄影技巧，记录美好生活',
    image: ''
  }
];

/**
 * 模拟AI聊天回复数据
 * 包含老年人常见的问题和对应的回答
 */
export const mockResponses = [
  {
    keyword: '微信 发语音',
    response: `使用微信发语音消息很简单，以下是详细步骤：\n\n` +
      `1. 打开微信应用\n` +
      `2. 点击下方的"微信"标签，找到您想发送消息的联系人或群聊\n` +
      `3. 进入聊天界面后，点击底部的输入框\n` +
      `4. 点击输入框旁边的"按住说话"按钮\n` +
      `5. 按住不放，开始说话\n` +
      `6. 说完后松开手指，语音消息就发送出去了\n\n` +
      `如果您想取消发送，按住说话后向上滑动手指即可。`
  },
  {
    keyword: '天气',
    response: `今天是晴天，气温在18-26°C之间，非常适合外出活动。\n\n` +
      `不过早晚温差较大，建议您出门时带一件薄外套。\n\n` +
      `如果您想查看更详细的天气预报，可以前往生活服务页面查看。`
  },
  {
    keyword: '设置 闹钟',
    response: `设置手机闹钟的步骤如下：\n\n` +
      `1. 打开手机的"时钟"或"闹钟"应用\n` +
      `2. 点击屏幕右下角的"+"号按钮，添加新闹钟\n` +
      `3. 通过滚动数字选择您想要的闹钟时间\n` +
      `4. 选择闹钟重复的日期（如果需要）\n` +
      `5. 选择闹钟铃声\n` +
      `6. 最后点击"确定"或"保存"按钮\n\n` +
      `设置完成后，到了设定的时间手机就会响起闹钟。`
  },
  {
    keyword: '支付宝 扫码 付款',
    response: `使用支付宝扫码付款的步骤：\n\n` +
      `1. 打开支付宝应用\n` +
      `2. 在首页找到"扫一扫"按钮（通常在页面上方）\n` +
      `3. 点击"扫一扫"，将手机摄像头对准商家的二维码\n` +
      `4. 扫描成功后，输入您要支付的金额\n` +
      `5. 点击"确认付款"\n` +
      `6. 输入您的支付密码或验证指纹/面容\n\n` +
      `付款成功后，页面会显示支付结果。请务必确认金额正确后再支付。`
  },
  {
    keyword: '查询 公交 路线',
    response: `查询公交路线的方法：\n\n` +
      `1. 打开微信或支付宝等应用\n` +
      `2. 找到"城市服务"或直接搜索"公交查询"\n` +
      `3. 在公交查询页面，输入您的起点和终点\n` +
      `4. 点击"查询"按钮\n` +
      `5. 系统会显示多条可选路线，包括换乘方案\n\n` +
      `您也可以下载专门的公交查询APP，如高德地图、百度地图等，这些应用的公交查询功能更加详细。`
  },
  {
    keyword: '健康',
    response: `老年人保持健康的几点建议：\n\n` +
      `1. 保持规律的作息时间，早睡早起\n` +
      `2. 饮食均衡，多吃蔬菜水果，少吃油腻食物\n` +
      `3. 每天进行适量的运动，如散步、太极等\n` +
      `4. 保持良好的心态，多与家人朋友交流\n` +
      `5. 定期体检，及时了解自己的健康状况\n` +
      `6. 遵医嘱按时服药（如果有慢性病）\n\n` +
      `您可以在我们的健康管理页面记录您的健康数据，查看更多健康知识。`
  },
  {
    keyword: '手机 充电',
    response: `正确给手机充电的方法：\n\n` +
      `1. 使用手机原装充电器和数据线\n` +
      `2. 当手机电量低于20%时开始充电\n` +
      `3. 尽量不要等到电量完全耗尽才充电\n` +
      `4. 充满电后及时拔掉充电器，避免长时间过度充电\n` +
      `5. 充电时尽量不要使用手机，特别是玩游戏等大功耗应用\n` +
      `6. 保持充电接口清洁，避免灰尘进入\n\n` +
      `正确的充电习惯可以延长电池使用寿命。`
  },
  {
    keyword: '拍照',
    response: `使用手机拍照的基本步骤：\n\n` +
      `1. 打开手机的"相机"应用\n` +
      `2. 对准您想要拍摄的景物或人物\n` +
      `3. 点击屏幕上的圆形拍照按钮\n` +
      `4. 拍摄完成后，可以点击预览查看照片\n` +
      `5. 如果不满意，可以删除重拍\n\n` +
      `提示：拍照时保持手机稳定，可以获得更清晰的照片。`
  },
  {
    keyword: '接听 电话',
    response: `接听手机电话的方法：\n\n` +
      `当手机来电时：\n` +
      `1. 如果是滑动接听：将绿色电话图标向右滑动\n` +
      `2. 如果是按钮接听：点击绿色的接听按钮\n\n` +
      `挂断电话：\n` +
      `1. 通话过程中，点击红色的挂断按钮\n` +
      `2. 如果不方便接听，可以点击静音或拒接按钮\n\n` +
      `如果您使用的是老年机，接听方式可能会有所不同，请参考手机说明书。`
  },
  {
    keyword: '视频 通话',
    response: `使用微信进行视频通话的步骤：\n\n` +
      `1. 打开微信，找到您想要视频通话的联系人\n` +
      `2. 进入聊天界面，点击右下角的"+"号按钮\n` +
      `3. 在弹出的菜单中选择"视频通话"\n` +
      `4. 对方接听后，就可以进行视频通话了\n\n` +
      `提示：视频通话需要网络连接，建议在WiFi环境下使用，效果更好也更省流量。`
  }
]

/**
 * 老年人常见数字鸿沟问题类别
 */
export const digitalGapCategories = [
  {
    id: 'basic',
    name: '基础操作',
    icon: '📱',
    description: '手机的基本使用方法'
  },
  {
    id: 'communication',
    name: '通讯应用',
    icon: '💬',
    description: '微信、电话等通讯工具的使用'
  },
  {
    id: 'payment',
    name: '移动支付',
    icon: '💰',
    description: '支付宝、微信支付等使用方法'
  },
  {
    id: 'travel',
    name: '出行服务',
    icon: '🚌',
    description: '公交、打车、导航等服务使用'
  },
  {
    id: 'entertainment',
    name: '娱乐休闲',
    icon: '🎵',
    description: '看视频、听音乐等娱乐功能'
  },
  {
    id: 'health',
    name: '健康管理',
    icon: '🏥',
    description: '健康类应用和服务使用'
  }
]

/**
 * 常见的手机使用问题及解答
 */
export const commonPhoneIssues = [
  {
    question: '手机屏幕突然变暗怎么回事？',
    answer: '这可能是因为开启了自动亮度调节功能。您可以：\n1. 从手机顶部向下滑动打开通知栏\n2. 找到亮度调节滑块\n3. 调高亮度或关闭自动亮度功能'
  },
  {
    question: '手机电池消耗很快怎么办？',
    answer: '延长手机电池续航的方法：\n1. 调低屏幕亮度\n2. 关闭不使用的应用后台运行\n3. 关闭蓝牙、GPS等不需要的功能\n4. 减少屏幕使用时间'
  },
  {
    question: '手机忘记解锁密码怎么办？',
    answer: '如果忘记了解锁密码，建议：\n1. 尝试使用指纹或面容识别（如果已设置）\n2. 联系手机品牌客服寻求帮助\n3. 携带身份证和购机凭证到官方售后点解锁\n注意：不要尝试多次输入错误密码，可能会导致手机锁定'
  },
  {
    question: '手机连接不上WiFi怎么办？',
    answer: '解决WiFi连接问题的方法：\n1. 重启手机和路由器\n2. 检查WiFi密码是否正确\n3. 忘记当前WiFi网络，重新搜索连接\n4. 检查路由器是否正常工作'
  }
]

/**
 * 健康相关模拟数据
 */
export const mockHealthData = {
  // 用户健康数据和健康目标
  userProfile: {
    name: '张爷爷',
    age: 72,
    gender: '男',
    height: 170,
    weight: 68,
    bloodType: 'A型'
  },
  currentHealth: {
    bloodPressure: { systolic: 132, diastolic: 85 },
    bloodSugar: 5.4,
    heartRate: 76,
    bodyTemperature: 36.5,
    steps: 5832,
    sleepHours: 7.5,
    mood: 'good' // excellent, good, normal, bad, poor
  },
  healthGoals: {
    steps: 8000,
    sleepHours: 8,
    dailyWaterIntake: 1500,
    exerciseMinutes: 30
  },
  healthTrends: {
    steps: [5200, 5500, 6000, 5800, 6200, 5900, 5832],
    sleepHours: [7.2, 7.5, 7.0, 7.8, 7.3, 7.1, 7.5],
    bloodPressure: [
      { systolic: 135, diastolic: 88 },
      { systolic: 132, diastolic: 85 },
      { systolic: 134, diastolic: 87 },
      { systolic: 130, diastolic: 82 },
      { systolic: 133, diastolic: 86 },
      { systolic: 131, diastolic: 84 },
      { systolic: 132, diastolic: 85 }
    ]
  },
  signInHistory: [
    { date: '2024-01-20', time: '08:30', consecutiveDays: 15 },
    { date: '2024-01-19', time: '09:15', consecutiveDays: 14 },
    { date: '2024-01-18', time: '08:45', consecutiveDays: 13 },
    { date: '2024-01-17', time: '10:20', consecutiveDays: 12 },
    { date: '2024-01-16', time: '09:40', consecutiveDays: 11 },
    { date: '2024-01-15', time: '08:50', consecutiveDays: 10 },
    { date: '2024-01-14', time: '09:05', consecutiveDays: 9 },
  ]
};

// 为兼容性保留原来的导出名称
export const healthData = mockHealthData;
export const checkInHistory = mockHealthData.signInHistory;

/**
 * 健康建议数据
 */
export const mockHealthSuggestions = [
  { id: 1, title: '保持适量运动', content: '每天进行30分钟左右的散步，有助于提高心肺功能和增强免疫力。', category: 'exercise', priority: 'high' },
  { id: 2, title: '均衡饮食', content: '多吃蔬菜和水果，适量摄入蛋白质，控制盐分和糖分的摄入。', category: 'diet', priority: 'high' },
  { id: 3, title: '保持良好睡眠', content: '建议每晚保持7-8小时的睡眠时间，睡前避免使用电子设备。', category: 'sleep', priority: 'medium' },
  { id: 4, title: '定期测量血压', content: '建议每天固定时间测量血压，记录血压变化趋势。', category: 'monitoring', priority: 'high' },
  { id: 5, title: '保持心情愉悦', content: '参与社交活动，培养兴趣爱好，保持积极乐观的心态。', category: 'mental', priority: 'medium' },
  { id: 6, title: '多喝水', content: '每天保持充足的水分摄入，建议饮水量约1500-2000毫升。', category: 'lifestyle', priority: 'medium' },
  { id: 7, title: '注意保暖', content: '根据天气变化及时增减衣物，避免受凉感冒。', category: 'lifestyle', priority: 'low' },
  { id: 8, title: '定期体检', content: '每年至少进行一次全面体检，及时发现健康问题。', category: 'medical', priority: 'high' },
];

// 为兼容性保留原来的导出名称
export const healthAdvice = mockHealthSuggestions;

/**
 * 健康提醒数据
 */
export const healthReminders = [
  { id: 1, title: '服药提醒', time: '08:00', description: '服用降压药', isEnabled: true },
  { id: 2, title: '测量血压', time: '14:00', description: '下午测量并记录血压', isEnabled: true },
  { id: 3, title: '散步时间', time: '17:30', description: '傍晚散步30分钟', isEnabled: true },
  { id: 4, title: '测量血糖', time: '20:00', description: '睡前测量血糖', isEnabled: false },
  { id: 5, title: '睡觉提醒', time: '22:30', description: '准备睡觉，保持充足睡眠', isEnabled: true },
];