#!/usr/bin/env bash
# 诊断 adesgin.alaikis.com 404 原因
set -e
echo "=== 1. 默认 DNS 解析 ==="
nslookup adesgin.alaikis.com 2>&1 | head -15 || true
echo ""
echo "=== 2. 直接访问 HTTP 状态码 ==="
curl -s -o /dev/null -w "HTTP %{http_code}\n" https://adesgin.alaikis.com/ || echo "curl 失败"
echo ""
echo "=== 3. 响应头 ==="
curl -sI https://adesgin.alaikis.com/ 2>&1 | head -15 || true
echo ""
echo "=== 4. 检查是否走 Cloudflare ==="
curl -s https://adesgin.alaikis.com/ 2>&1 | grep -i "cf-\|cloudflare\|server" | head -5 || echo "无 cf 标记"
echo ""
echo "=== 5. 对比 alaikis.github.io 直连 ==="
curl -s -o /dev/null -w "alaikis.github.io HTTP %{http_code}\n" https://alaikis.github.io/ || true
curl -sI https://alaikis.github.io/ 2>&1 | head -8 || true
