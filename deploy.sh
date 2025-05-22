echo "🔁 拉取最新代码..."
git pull origin master

echo "🧹 清理旧的缓存..."
rm -rf .output/cache/*

echo "🏗️ 重新构建项目..."
npm run build

echo "📂 设置缓存目录权限..."
mkdir -p .output/cache
chmod -R 755 .output/cache

echo "🚀 重启 PM2 服务..."
pm2 start ecosystem.config.js

echo "✅ 部署完成！"