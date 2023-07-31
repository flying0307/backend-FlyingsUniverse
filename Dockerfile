# 使用官方的 node 基礎映像作為基礎
FROM node:18

# 設定工作目錄
WORKDIR /usr/src/app

# 將 package.json 和 package-lock.json 複製到工作目錄
COPY package*.json ./

# 安裝應用程式的依賴項
RUN npm install

# 複製應用程式的源碼到工作目錄
COPY . .

# 將你的應用程式需要的埠暴露給 Docker 容器
EXPOSE 8080

# 運行你的應用程式
CMD [ "npm", "run", "docker" ]
