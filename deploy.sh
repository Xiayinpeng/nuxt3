echo "🔁 拉取最新代码..."
git pull origin master
echo "🔄 检查是否安装了 PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "🔄 安装 PM2..."
    npm install pm2 -g

echo "📦 安装依赖..."
npm install

echo "🏗️ 重新构建项目..."
npm run build

echo "🚀 重启 PM2 服务..."
pm2 restart nuxt3_demo

echo "✅ 部署完成！"