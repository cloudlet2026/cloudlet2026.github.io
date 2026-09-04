/* =============================================
   Mermaid 全局字体 (由 _config.butterfly.yml inject.head 引入)
   让 mermaid 渲染/测量时使用与 custom.css --font-body 相同的字体,
   因此只需要维护 custom.css 里的 --font-body 一处。

   说明: 实测 mermaid 11 会丢弃 %%{init}%% 指令里的 themeVariables,
   只有 mermaid.initialize() 的全局设置才生效, 且不会被 Butterfly
   后续注入的 theme: default/dark 指令覆盖。因此必须在渲染前调用一次
   initialize(), 使"量框"与"绘制"使用同一种字体(否则按旧字体量框 +
   新字体绘制会导致文字溢出被框裁掉)。
   ============================================= */
(function () {
  var readBodyFont = function () {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue('--font-body')
      if (v && v.trim()) return v.trim()
    } catch (e) { /* ignore */ }
    return "'LXGW WenKai Screen', sans-serif"
  }

  var apply = function () {
    if (!window.mermaid || !window.mermaid.initialize || window.__mermaidFontApplied) return
    try {
      window.mermaid.initialize({
        startOnLoad: false,
        themeVariables: { fontFamily: readBodyFont() }
      })
      window.__mermaidFontApplied = true
    } catch (e) { /* ignore */ }
  }

  // mermaid 由 Butterfly 在 DOMContentLoaded 后动态加载,
  // 这里用捕获阶段监听其 script 的 load 事件, 保证先于首次渲染执行 initialize
  document.addEventListener('load', function (e) {
    var t = e.target
    if (t && t.tagName === 'SCRIPT' && t.src && /mermaid[^/]*\.min\.js/i.test(t.src)) apply()
  }, true)
  document.addEventListener('DOMContentLoaded', apply)
  apply()
})()
