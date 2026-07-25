---
title: 安全跳转中
type: go
comments: false
date: 2026-07-25 12:00:00
---

<style>
  /* 隐藏 Butterfly 自动生成的标题和元信息 */
  #post > .post-title,
  #post > .post-meta {
    display: none !important;
  }

  /* 中转页容器 */
  .go-card {
    max-width: 480px;
    margin: 0 auto;
    padding: 44px 32px 36px;
    text-align: center;
  }

  .go-card .icon-wrap {
    font-size: 52px;
    line-height: 1;
    margin-bottom: 20px;
  }

  .go-card h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--font-color);
    margin: 0 0 8px;
  }

  .go-card .desc {
    font-size: 14px;
    color: var(--second-font-color, #666);
    margin: 0 0 28px;
    line-height: 1.6;
  }

  .go-card .warning {
    background: rgba(240, 180, 0, 0.1);
    border: 1px solid rgba(240, 180, 0, 0.25);
    border-left: 4px solid #f0b400;
    padding: 14px 16px;
    border-radius: 10px;
    font-size: 13px;
    color: #a07000;
    text-align: left;
    margin-bottom: 30px;
    line-height: 1.7;
  }

  [data-theme="dark"] .go-card .warning {
    background: rgba(240, 180, 0, 0.06);
    border-color: rgba(240, 180, 0, 0.15);
    color: #d4a520;
  }

  /* 倒计时区域 */
  .go-card .countdown-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }

  .go-card .countdown-label {
    font-size: 14px;
    color: var(--second-font-color, #8b949e);
  }

  .go-card .countdown-num {
    font-size: 32px;
    font-weight: 700;
    color: var(--btn-bg, #49b1f5);
    background: rgba(73, 177, 245, 0.1);
    min-width: 52px;
    line-height: 56px;
    border-radius: 10px;
    font-variant-numeric: tabular-nums;
  }

  [data-theme="dark"] .go-card .countdown-num {
    background: rgba(73, 177, 245, 0.08);
  }

  /* 按钮 */
  .go-card .btn {
    display: inline-block;
    padding: 12px 40px;
    background: var(--btn-bg, #49b1f5);
    color: #fff;
    border-radius: 8px;
    text-decoration: none !important;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.25s ease;
    border: none;
    cursor: pointer;
  }

  .go-card .btn:hover {
    background: var(--btn-hover-color, #3ea2e8);
    color: #fff !important;
    text-decoration: none !important;
    box-shadow: 0 4px 16px rgba(73, 177, 245, 0.35);
  }

  .go-card .footer-note {
    margin-top: 20px;
    font-size: 12px;
    color: #adb5bd;
  }

  [data-theme="dark"] .go-card .footer-note {
    color: #555;
  }

  /* 无效链接提示 */
  .go-error {
    padding: 32px 20px;
    text-align: center;
  }
  .go-error .error-icon { font-size: 48px; margin-bottom: 16px; line-height: 1; }
  .go-error h2 { font-size: 18px; color: var(--font-color); margin: 0 0 8px; }
  .go-error p { font-size: 14px; color: var(--second-font-color, #666); margin: 0; }
</style>

<div class="go-card">
  <div class="icon-wrap">🔗</div>
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
  <a href="#" id="targetLink" class="btn">立即前往 →</a>
  <div class="footer-note">
    如果页面未自动跳转，请点击上方按钮
  </div>
</div>

<script>
  (function() {
    var params = new URLSearchParams(window.location.search);
    var target = params.get('url');

    if (!target || !/^https?:\/\/.+/.test(target)) {
      var card = document.querySelector('.go-card');
      card.innerHTML = '<div class="go-error">' +
        '<div class="error-icon">🚫</div>' +
        '<h2>无效链接</h2>' +
        '<p>缺少或包含非法参数的跳转请求</p>' +
        '</div>';
      return;
    }

    var btn = document.getElementById('targetLink');
    var timerEl = document.getElementById('timer');
    btn.href = target;

    var seconds = 3;
    var interval = setInterval(function() {
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