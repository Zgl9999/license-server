```javascript
// api/verify.js - 完整代码
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: '✅ 卡密验证API',
      version: '1.0',
      endpoints: {
        activate: 'POST /api/verify - 激活卡密',
        verify: 'POST /api/verify - 验证卡密',
        status: 'POST /api/verify - 查询状态'
      }
    });
    return;
  }
  
  if (req.method === 'POST') {
    try {
      const { action, licenseKey, deviceId } = req.body;
      
      if (action === 'test') {
        res.status(200).json({
          success: true,
          message: '🎉 API测试成功',
          data: {
            action: action,
            licenseKey: licenseKey || '未提供',
            deviceId: deviceId || '未提供',
            timestamp: new Date().toISOString()
          }
        });
        return;
      }
      
      if (action === 'activate') {
        res.status(200).json({
          success: true,
          message: '✅ 卡密激活成功（模拟）',
          data: {
            licenseKey: licenseKey,
            deviceId: deviceId,
            expiry_time: new Date(Date.now() + 24 * 3600000).toISOString(),
            license_type: '天卡',
            remaining_hours: 24
          }
        });
        return;
      }
      
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
        });
        return;
      }
      
      res.status(200).json({
        success: false,
        error: '未知操作',
        valid_actions: ['test', 'activate', 'verify']
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
    return;
  }
  
  res.status(405).json({
    success: false,
    error: '方法不允许'
  });
}
```
