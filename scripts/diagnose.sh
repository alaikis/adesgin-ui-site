#!/usr/bin/env bash
set +e
echo "=== DNS 解析 ==="
nslookup adesgin.alaikis.com 8.8.8.8 2>&1 | grep -E "Name:|Address:" | head -8
echo ""
echo "=== GitHub Pages 默认域 301 目标 ==="
curl -sI https://alaikis.github.io/adesgin-ui-site/ 2>&1 | grep -iE "HTTP|Location" | head -4
echo ""
echo "=== 直连 GitHub Pages IP（绕过 Cloudflare，自定义域 SNI）==="
for ip in 185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 8 --resolve "adesgin.alaikis.com:443:$ip" "https://adesgin.alaikis.com/" 2>&1)
  echo "IP $ip -> HTTP $code"
done
echo ""
echo "=== 直连内容抽查 ==="
body=$(curl -s --connect-timeout 8 --resolve "adesgin.alaikis.com:443:185.199.108.153" "https://adesgin.alaikis.com/" 2>&1 | head -c 200)
echo "$body"
echo ""
echo "=== 默认域直连（无 301，验证 Pages 有 content）==="
curl -s -o /dev/null -w "HTTP %{http_code}\n" --resolve "alaikis.github.io:443:185.199.108.153" "https://alaikis.github.io/" 2>&1
