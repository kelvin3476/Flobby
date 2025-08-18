##!/bin/bash

# 빌드 실행
echo "Building the Flobby Project..."
npm run build

# 배포 타켓 및 pem 키 절대 경로 값 불러오기
TARGET="$1"
PEM_PATH="$(pwd)/pem/flobby-web.pem"

if [ "$TARGET" == "dev" ]; then
  scp -r dist/* dev@152.67.192.43:~/dist

  # 개발 서버 배포 완료 메시지 출력
  echo "Deployment to Dev Server Completed!"
elif [ "$TARGET" == "prod" ]; then
  scp -i "$PEM_PATH" -r dist/* ubuntu@152.67.192.43:~/dist

  # 상용 서버 배포 완료 메시지 출력
  echo "Deployment to Production Server Completed!"
else
  echo "Usage: $0 [dev|prod]"
  exit 1
fi
