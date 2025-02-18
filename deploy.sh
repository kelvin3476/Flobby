#!/bin/bash

# 빌드 실행
echo "Building the Flobby Project..."
npm run build

# 빌드 후 dist 폴더에 있는 모든 파일을 서버로 복사
echo "Deploying to Server..."
scp -r dist/* ksubin@220.93.95.108:~/flobby/frontend

# 배포 완료 메시지 출력
echo "Deployment Completed!"