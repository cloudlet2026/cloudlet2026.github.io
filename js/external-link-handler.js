(function() {
  // ====== 配置区 ======
  const CONFIG = {
    // 你的博客域名（多个用逗号分隔）
    whitelistDomains: [
      'cloudlet2026.github.io',
      'github.com'
    ],
    // 中转页路径
    redirectPath: '/go/?url='
  };
  // ====================

  // 判断是否为站内链接
  function isInternalLink(href) {
    if (!href || !href.match(/^https?:\/\//)) return true; // 相对路径视为内部链接
    
    // 检查是否在白名单中
    const isWhitelisted = CONFIG.whitelistDomains.some(domain => {
      return href.includes(domain);
    });
    
    return isWhitelisted;
  }

  // 拦截外链点击
  document.addEventListener('click', function(e) {
    let target = e.target.closest('a');
    if (!target) return;

    let href = target.getAttribute('href');
    if (!href) return;

    // 如果是内部链接，放行
    if (isInternalLink(href)) return;

    // 阻止默认跳转，改为走中转页
    e.preventDefault();
    var a = document.createElement('a');
    a.href = CONFIG.redirectPath + encodeURIComponent(href);
    a.target = '_blank';
    a.rel = 'noopener';
    a.click();
  });

  const rewriteHbeButtonText = () => {
    document.querySelectorAll('.hbe-button').forEach(button => {
      if (button.textContent.trim() === 'Decrypt') {
        button.textContent = '解密';
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewriteHbeButtonText, { once: true });
  } else {
    rewriteHbeButtonText();
  }

})();
