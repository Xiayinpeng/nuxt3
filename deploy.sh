echo "🔁 拉取最新代码..."
git pull origin master


echo "🏗️ 重新构建项目..."
npm run build

echo "🚀 重启 PM2 服务..."
pm2 restart nuxt3_demo

echo "✅ 部署完成！"