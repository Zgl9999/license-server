```javascript
// api/verify.js
export default async function handler(req, res) {
  // 设置CORS头，允许跨域
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  // GET请求：返回API信息
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: '✅ 卡密验证API',
      version: '1.0',
      endpoints: {
        activate: 'POST /api/verify - 激活卡密',
        verify: 'POST /api/verify - 验证卡密',
        status: 'POST /api/verify - 查询状态',
        test: 'POST /api/verify - 测试连接'
      },
      example: {
        curl: 'curl -X POST "你的域名/api/verify" -H "Content-Type: application/json" -d \'{"action":"test"}\''
      }
    })
    return
  }
  
  // POST请求：处理业务逻辑
  if (req.method === 'POST') {
    try {
      const { action, licenseKey, deviceId, deviceInfo } = req.body
      
      // 测试接口
      if (action === 'test') {
        res.status(200).json({
          success: true,
          message: '🎉 API连接正常',
          timestamp: new Date().toISOString(),
          data_received: { action, licenseKey, deviceId }
        })
        return
      }
      
      // 激活卡密（简化版）
      if (action === 'activate') {
        // 这里可以添加你的激活逻辑
        // 现在返回模拟数据
        res.status(200).json({
          success: true,
          message: '✅ 卡密激活成功',
          data: {
            licenseKey: licenseKey,
            deviceId: deviceId,
            expiry_time: new Date(Date.now() + 24 * 3600000).toISOString(),
            license_type: '天卡',
            remaining_hours: 24
          }
        })
        return
      }
      
      // 验证卡密
      if (action === 'verify') {
        res.status(200).json({
          success: true,
          valid: true,
          message: '✅ 卡密验证通过',
          data: {
            remaining_hours: 23,
            remaining_minutes: 30,
            expiry_time: new Date(Date.now() + 23.5 * 3600000).toISOString()
          }
        })
        return
      }
      
      // 未知action
      res.status(200).json({
        success: false,
        error: 'Invalid action',
        valid_actions: ['test', 'activate', 'verify', 'status']
      })
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
    return
  }
  
  // 其他请求方法
  res.status(405).json({
    success: false,
    error: 'Method not allowed'
  })
}
```
