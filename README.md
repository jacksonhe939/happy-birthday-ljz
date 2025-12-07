# 🎂 LJZ生日礼物网站 

一个超级浪漫的生日礼物网站，专为ljz设计 ❤️

## ✨ 特色功能

- 💕 **开场动画** - 心跳效果的浪漫开场
- 📸 **照片墙** - 85张美好回忆照片逐渐浮现
- 💖 **心形汇聚** - 照片汇聚成爱心形状
- 💌 **浪漫贺卡** - 深情的生日祝福
- ✨ **粒子效果** - 飘落的爱心和星星
- 🎨 **精美设计** - 优雅的配色和动画

## 📁 项目结构

```
ljz-birthday/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
├── images/             # 照片文件夹
│   └── (放置所有照片)
└── README.md          # 说明文档
```

## 🚀 部署到GitHub Pages

### 步骤1：准备照片

1. 将所有照片复制到 `images` 文件夹中
2. 确保照片文件名与 `script.js` 中的文件名一致

### 步骤2：创建GitHub仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 仓库名称输入：`ljz-birthday` (或任何您喜欢的名字)
4. 选择 "Public" (公开)
5. 点击 "Create repository"

### 步骤3：上传文件

#### 方法A：使用GitHub网页界面 (推荐新手)

1. 在新创建的仓库页面，点击 "uploading an existing file"
2. 将所有文件拖拽到页面中：
   - index.html
   - styles.css
   - script.js
   - images文件夹（包含所有照片）
3. 点击 "Commit changes"

#### 方法B：使用Git命令行

```bash
# 在项目文件夹中打开终端/命令提示符
cd ljz-birthday-website

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "🎂 初始版本 - LJZ生日礼物"

# 连接到GitHub仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ljz-birthday.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 步骤4：启用GitHub Pages

1. 在GitHub仓库页面，点击 "Settings"
2. 在左侧菜单找到 "Pages"
3. 在 "Source" 下选择：
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 "Save"
5. 等待几分钟，页面会显示您的网站链接

**您的网站地址将是：**
```
https://YOUR_USERNAME.github.io/ljz-birthday/
```

## 📝 自定义说明

如果您想修改照片或文字：

### 修改照片：
1. 替换 `images` 文件夹中的照片
2. 更新 `script.js` 中的 `photoFiles` 数组

### 修改祝福文字：
编辑 `index.html` 中的贺卡内容部分（在 `<div id="card">` 区域）

### 修改颜色主题：
编辑 `styles.css` 文件开头的 CSS 变量：
```css
:root {
    --primary-color: #ff6b9d;  /* 主色调 */
    --secondary-color: #ffd93d; /* 次要颜色 */
    --accent-color: #c44569;    /* 强调色 */
}
```

## 🎯 使用方法

网站部署后，ljz只需要：
1. 打开您分享的链接
2. 点击跳动的心形开始
3. 浏览照片墙
4. 点击"汇聚成心"查看心形照片墙
5. 点击"打开我的心"阅读您的祝福

## 💝 技术栈

- HTML5
- CSS3 (动画、渐变、响应式设计)
- Vanilla JavaScript
- Canvas API (粒子效果)

## 📱 浏览器兼容性

支持所有现代浏览器：
- Chrome/Edge (推荐)
- Firefox
- Safari
- 移动浏览器

## ❤️ 特别说明

这是一份独一无二的生日礼物，承载着满满的爱意和美好回忆。

祝ljz生日快乐！🎉

---

Made with ❤️ by 张金阳
