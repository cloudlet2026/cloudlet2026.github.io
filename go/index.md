---
title: 安全跳转中
type: go
comments: false
date: 2026-07-25 12:00:00
---

<style>
  /* 中转页专用样式 */
  .go-card {
    max-width: 500px;
    margin: 60px auto;
    padding: 40px 30px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: center;
  }
  .go-card .icon { font-size: 48px; margin-bottom: 16px; }
  .go-card h2 { font-size: 22px; color: #24292f; margin-bottom: 8px; }
  .go-card .desc { font-size: 14px; color: #57606a; margin-bottom: 24px; }
  .go-card .warning {
    background: #fff8e7;
    border-left: 4px solid #f0b400;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
    color: #8a6d0b;
    text-align: left;
    margin-bottom: 28px;
  }
  .go-card .countdown-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  .go-card .countdown-num {
    font-size: 36px;
    font-weight: 700;
    color: #0969da;
    background: #f0f6ff;
    padding: 0 16px;
    border-radius: 8px;
    min-width: 60px;
    line-height: 64px;
  }
  .go-card .btn {
    display: inline-block;
    padding: 12px 36px;
    background: #0969da;
    color: #fff !important;
    border-radius: 8px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: background 0.2s;
  }
  .go-card .btn:hover { background: #0550ae; color: #fff !important; }
  .go-card .footer-note { margin-top: 20px; font-size: 12px; color: #8b949e; }
  /* 暗色模式下适配 Butterfly */
  [data-theme="dark"] .go-card {
    background: #1c1c1c;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  [data-theme="dark"] .go-card h2 { color: #e6e6e6; }
  [data-theme="dark"] .go-card .desc { color: #a0a0a0; }
  [data-theme="dark"] .go-card .warning {
    background: #2a2416;
    color: #d4a00a;
    border-left-color: #f0b400;
  }
  [data-theme="dark"] .go-card .countdown-num {
    background: #1a2a40;
    color: #58a6ff;
  }
  [data-theme="dark"] .go-card .footer-note { color: #5a5a5a; }
</style>

<div class="go-card">
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
    const params = new URLSearchParams(window.location.search);
    let target = params.get('url');

    if (!target || !target.match(/^https?:\/\/.+/)) {
      document.querySelector('.go-card').innerHTML = `
        <div style="padding:20px;">
          <div style="font-size:48px;margin-bottom:16px;">🚫</div>
          <h2>无效链接</h2>
          <p style="color:#57606a;font-size:14px;">缺少或包含非法参数的跳转请求</p>
        </div>
      `;
      throw new Error('Invalid URL');
    }

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

    btn.addEventListener('click', function() {
      clearInterval(interval);
    });
  })();
</script>