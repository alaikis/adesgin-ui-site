#!/usr/bin/env bash
set +e
echo "=== DNS 当前指向 ==="
nslookup adesgin.alaikis.com 8.8.8.8 2>&1 | grep -E "Name:|Address:" | head -8
echo ""
echo "=== 直连 GitHub Pages IP（绕过 Cloudflare 代理）==="
for ip in 185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 --resolve "adesgin.alaikis.com:443:$ip" "https://adesgin.alaikis.com/" 2>&1)
  echo "IP $ip -> HTTP $code"
done
echo ""
echo "=== 检查 GitHub Pages 是否有 content（直连 IP + 默认域 SNI）==="
code=$(curl -s -o /tmp/ghp.html -w "%{http_code}" --connect-timeout 10 --resolve "adesgin.alaikis.com:443:185.199.108.153" "https://adesgin.alaikis.com/" 2>&1)
echo "HTTP $code"
head -c 300 /tmp/ghp.html 2>/dev/null
echo ""
echo ""
echo "=== 检查 alaikis.github.io 根（组织首页状态）==="
curl -s -o /dev/null -w "HTTP %{http_code}\n" --connect-timeout 10 "https://alaikis.github.io/"
echo ""
echo "=== 检查 alaikis.github.io/adesgin-ui-site/（默认域子路径）==="
curl -s -o /dev/null -w "HTTP %{http_code} | redirect %{redirect_url}\n" --connect-timeout 10 "https://alaikis.github.io/adesgin-ui-site/"
