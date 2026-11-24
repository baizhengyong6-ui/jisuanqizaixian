#!/usr/bin/env bash
# 一键同步本项目到 GitHub：启动日本节点 -> 提交 -> 推送 -> 关闭节点
# 用法：在 Git Bash 中执行  bash tools/sync_to_github.sh "提交说明"
# 令牌已存入 Windows Git 凭证管理器，脚本内不含任何密钥。
set -u
PROJ="$(cd "$(dirname "$0")/.." && pwd)"
TUNNEL="/c/Users/b/WorkBuddy/2026-09-23-11-13-18/_xai_tunnel/jp-tunnel.sh"
MSG="${1:-update: $(date '+%Y-%m-%d %H:%M')}"

cd "$PROJ" || exit 1

echo "[1/4] 启动日本节点..."
bash "$TUNNEL" start >/dev/null 2>&1 &
sleep 4
STATUS="$(bash "$TUNNEL" status)"
echo "      $STATUS"
case "$STATUS" in UP*) ;; *) echo "节点未启动，同步中止"; exit 1;; esac

echo "[2/4] 提交本地变更..."
git add -A
if git diff --cached --quiet; then
  echo "      无变更可提交"
else
  git commit -m "$MSG" && echo "      已提交：$MSG"
fi

echo "[3/4] 推送到 GitHub..."
GIT_TERMINAL_PROMPT=0 git -c http.proxy=http://127.0.0.1:17890 \
    -c https.proxy=http://127.0.0.1:17890 push origin main || {
  echo "      推送失败，节点保持运行供排查"
  exit 1
}

echo "[4/4] 关闭节点..."
bash "$TUNNEL" stop
echo "完成。仓库：https://github.com/baizhengyong6-ui/jisuanqizaixian"
