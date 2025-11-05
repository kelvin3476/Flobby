##!/bin/bash

# Flobby Front-End 배포 스크립트
# 사용법: npm run deploy [dev|prod] => ./deploy.sh [dev|prod]

# 배포 과정에서 오류 발생시 즉시 중단
set -e

# ----------------------------
# 1. 환경 변수 로드
# ----------------------------
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "❌ .env 파일이 없습니다. 환경 설정을 먼저 해주세요."
  exit 1
fi

# 배포 타켓 및 pem 키 절대 경로 값 불러오기
TARGET="$1"
PEM_PATH="$(pwd)/pem/flobby-web.pem"

# [dev|prod] 중 하나 선택 필수 (입력 안할시 종료)
if [ -z "$TARGET" ]; then
  echo "Usage: $0 [dev|prod]"
  exit 1
fi

# ----------------------------
# 2. 서버 정보 설정
# ----------------------------
# 개발 서버 배포
if [ "$TARGET" == "dev" ]; then
  SERVER_USER="dev"
  SERVER_IP="152.67.192.43"
  SERVER_PASS="$VITE_DEV_SERVER_PASSWORD"
  NGINX_CONF="nginx/dev/dev.conf"
  REMOTE_CONF_PATH="/etc/nginx/sites-available/dev.conf"
  PEM_PATH=""

# 상용 서버 배포
elif [ "$TARGET" == "prod" ]; then
  SERVER_USER="ubuntu"
  SERVER_IP="152.67.192.43"
  SERVER_PASS=""
  NGINX_CONF="nginx/prod/default.conf"
  REMOTE_CONF_PATH="/etc/nginx/sites-available/default.conf"
  PEM_PATH="$PEM_PATH"

else
  echo "Usage: $0 [dev|prod]"
  exit 1
fi

# 배포 시작
echo "======================================"
echo "🚀 Flobby Deploy Start - $TARGET"
echo "======================================"

# ----------------------------
# 3. 빌드 실행
# ----------------------------
echo "======================================"
echo "🧱 Building the Flobby Project..."
echo "======================================"
npm run build

# ----------------------------
# 4. dist 배포
# ----------------------------
echo "📦 Deploying dist files to $TARGET..."

if [ "$TARGET" == "dev" ]; then
  if ! command -v sshpass &>/dev/null; then
    echo "⚠️ sshpass가 필요합니다. 설치 후 다시 시도하세요 (예: brew install hudochenkov/sshpass/sshpass)"
    exit 1
  fi
  # sshpass를 사용하여 비밀번호 접속후 dist 파일 복사 후 개발서버 클라우드 인스턴스로 전송
  sshpass -p "$SERVER_PASS" scp -r dist/* ${SERVER_USER}@${SERVER_IP}:~/dist
else
  # pem key값을 사용하여 접속후 dist 파일 복사 후 상용서버 클라우드 인스턴스로 전송
  scp -i "$PEM_PATH" -r dist/* ${SERVER_USER}@${SERVER_IP}:~/dist
fi

# 개발 or 상용 서버 배포 완료 메시지 출력
echo "✅ Deployment to $TARGET Server Completed!"

# ----------------------------
# 5. nginx 설정 변경 감지 및 배포
# ----------------------------
echo "🔍 Checking nginx config changes..."

LOCAL_HASH=$(md5sum "$NGINX_CONF" | awk '{print $1}')

if [ "$TARGET" == "dev" ]; then
  REMOTE_HASH=$(sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} \
    "md5sum /etc/nginx/sites-available/dev.conf 2>/dev/null | awk '{print \$1}' || echo none")
else
  REMOTE_HASH=$(ssh -i "$PEM_PATH" -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} \
    "md5sum /etc/nginx/sites-available/default.conf 2>/dev/null | awk '{print \$1}' || echo none")
fi

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
  echo "⚡ nginx 설정 변경 감지됨 → 배포 진행"

  TEMP_REMOTE_PATH="/home/${SERVER_USER}/nginx_temp.conf"

  # (1) nginx 설정 파일을 일반 계정 홈으로 업로드
  if [ "$TARGET" == "dev" ]; then
    sshpass -p "$SERVER_PASS" scp -r "$NGINX_CONF" ${SERVER_USER}@${SERVER_IP}:${TEMP_REMOTE_PATH}
    # (2) 원격 서버에서 sudo mv 로 실제 경로로 이동
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_IP} "\
      echo \"$SERVER_PASS\" | sudo -S mv ${TEMP_REMOTE_PATH} ${REMOTE_CONF_PATH} && \
      echo \"$SERVER_PASS\" | sudo -S ln -sf ${REMOTE_CONF_PATH} /etc/nginx/sites-enabled/$(basename ${REMOTE_CONF_PATH}) && \
      echo \"$SERVER_PASS\" | sudo -S nginx -t && \
      echo \"$SERVER_PASS\" | sudo -S systemctl reload nginx"
  else
    scp -i "$PEM_PATH" -r "$NGINX_CONF" ${SERVER_USER}@${SERVER_IP}:${TEMP_REMOTE_PATH}
    ssh -i "$PEM_PATH" ${SERVER_USER}@${SERVER_IP} "\
      sudo mv ${TEMP_REMOTE_PATH} ${REMOTE_CONF_PATH} && \
      sudo ln -sf ${REMOTE_CONF_PATH} /etc/nginx/sites-enabled/$(basename ${REMOTE_CONF_PATH}) && \
      sudo nginx -t && sudo systemctl reload nginx"
  fi

  echo "✅ $TARGET 서버 nginx 설정 배포 완료"
else
  echo "🟢 $TARGET 서버 nginx 설정 변경 없음 → 배포 생략"
fi

echo "======================================"
echo "🎉 Deploy finished for $TARGET"
echo "======================================"