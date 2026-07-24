---
title: 安全跳转中
type: go
comments: false
date: 2026-07-25 12:00:00
---
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>正在安全跳转...</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f6f8fa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    }
    .card {
      background: #fff;
      max-width: 500px;
      width: 90%;
      padding: 40px 30px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      text-align: center;
      transition: all 0.3s;
    }
    .card:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    .icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    h2 {
      font-size: 22px;
      color: #24292f;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .desc {
      font-size: 14px;
      color: #57606a;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .warning {
      background: #fff8e7;
      border-left: 4px solid #f0b400;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      color: #8a6d0b;
      text-align: left;
      margin-bottom: 28px;
    }
    .countdown-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }
    .countdown-num {
      font-size: 36px;
      font-weight: 700;
      color: #0969da;
      background: #f0f6ff;
      padding: 0 16px;
      border-radius: 8px;
      min-width: 60px;
      line-height: 64px;
    }
    .countdown-label {
      font-size: 16px;
      color: #57606a;
    }
    .btn {
      display: inline-block;
      padding: 12px 36px;
      background: #0969da;
      color: #fff !important;
      border-radius: 8px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.2s;
      border: none;
      cursor: pointer;
    }
    .btn:hover {
      background: #0550ae;
      color: #fff !important;
    }
    .btn:visited {
      color: #fff !important;
    }
    .footer-note {
      margin-top: 20px;
      font-size: 12px;
      color: #8b949e;
    }
    .footer-note a {
      color: #0969da;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🔗</div>
    <h2>正在跳转至外部链接</h2>
    <p class="desc">您即将离开本站，前往以下第三方网站</p>
    <div class="warning">
      ⚠️ 本站仅提供信息索引，不对第三方网站的内容及安全性负责。<br>
      请确保您访问的链接来源可靠，并遵守当地法律法规。
    </div>
    <div class="countdown-wrap">
      <span class="countdown-label">剩余</span>
      <span class="countdown-num" id="timer">3</span>
      <span class="countdown-label">秒</span>
    </div>
    <a href="#" id="targetLink" class="btn">立即前往 ➜</a>
    <div class="footer-note">
      如果页面未自动跳转，请点击上方按钮
    </div>
  </div>

  <script>
    (function() {
      // 1. 获取 URL 参数中的真实目标
      const params = new URLSearchParams(window.location.search);
      let target = params.get('url');

      // 2. 安全校验：只允许 http/https 协议
      if (!target || !target.match(/^https?:\/\/.+/)) {
        document.querySelector('.card').innerHTML = `
          <div style="padding: 20px;">
            <div style="font-size:48px;margin-bottom:16px;">🚫</div>
            <h2>无效链接</h2>
            <p style="color:#57606a;font-size:14px;">缺少或包含非法参数的跳转请求</p>
          </div>
        `;
        throw new Error('Invalid URL');
      }

      // 3. 白名单校验（可选）：只允许跳转到特定域名，防止被滥用
      // 如果你想把跳转限制在特定的几个网站，可以取消下面注释
      // const allowedDomains = ['example.com', 'github.com', 'your-blog.com'];
      // const isAllowed = allowedDomains.some(domain => target.includes(domain));
      // if (!isAllowed) {
      //   document.querySelector('.card').innerHTML = `
      //     <div style="padding:20px;">
      //       <div style="font-size:48px;margin-bottom:16px;">⛔</div>
      //       <h2>域名不在白名单中</h2>
      //       <p style="color:#57606a;font-size:14px;">该跳转请求已被安全策略拦截</p>
      //     </div>
      //   `;
      //   throw new Error('Domain not allowed');
      // }

      // 4. 绑定按钮和倒计时
      const btn = document.getElementById('targetLink');
      const timerEl = document.getElementById('timer');
      btn.href = target;

      let seconds = 3;
      const interval = setInterval(() => {
        seconds--;
        timerEl.textContent = seconds;
        if (seconds <= 0) {
          clearInterval(interval);
          window.location.href = target;
        }
      }, 1000);

      // 点击按钮立即跳转，并清除倒计时
      btn.addEventListener('click', function(e) {
        clearInterval(interval);
        // 不阻止默认行为，让链接正常跳转
      });
    })();
  </script>
</body>
</html>