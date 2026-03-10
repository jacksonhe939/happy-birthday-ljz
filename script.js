// --- 配置区 ---
const TOTAL_PHOTOS = 85; 

// 自动生成文件名数组 (匹配你截图里的 "1 (x).jpg")
const photoFiles = [];
for (let i = 1; i <= TOTAL_PHOTOS; i++) {
    photoFiles.push(`1 (${i}).jpg`);
}

// --- 🌸 浪漫粒子系统 (樱花 + 爱心 + 星星) ---
class RomanticParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 35; i++) {
            this.particles.push(this.createPetal());
        }
        for (let i = 0; i < 15; i++) {
            this.particles.push(this.createHeart());
        }
        for (let i = 0; i < 20; i++) {
            this.particles.push(this.createSparkle());
        }
    }

    createPetal() {
        return {
            type: 'petal',
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 8 + 4,
            speedX: Math.random() * 1.5 - 0.75,
            speedY: Math.random() * 1.2 + 0.4,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 1.5 - 0.75,
            opacity: Math.random() * 0.35 + 0.15
        };
    }

    createHeart() {
        return {
            type: 'heart',
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 6 + 4,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 + 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            opacity: Math.random() * 0.4 + 0.2
        };
    }

    createSparkle() {
        return {
            type: 'sparkle',
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 4 + 2,
            speedX: Math.random() * 0.8 - 0.4,
            speedY: Math.random() * 1.5 + 0.5,
            rotation: 0,
            rotationSpeed: Math.random() * 3,
            opacity: Math.random() * 0.5 + 0.3,
            twinkle: Math.random() * Math.PI * 2
        };
    }

    drawPetal(p) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.globalAlpha = p.opacity;
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(p.size, -p.size/2, p.size, p.size/2, 0, p.size);
        this.ctx.bezierCurveTo(-p.size, p.size/2, -p.size, -p.size/2, 0, 0);
        
        const gradient = this.ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        gradient.addColorStop(0, '#e8b4b8');
        gradient.addColorStop(1, '#f5e6e8');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawHeart(p) {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.globalAlpha = p.opacity;
        
        const s = p.size;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s * 0.3);
        this.ctx.bezierCurveTo(-s, -s * 0.3, -s, s * 0.5, 0, s * 0.9);
        this.ctx.bezierCurveTo(s, s * 0.5, s, -s * 0.3, 0, -s * 0.3);
        
        const gradient = this.ctx.createLinearGradient(-s, -s, s, s);
        gradient.addColorStop(0, '#e8b4b8');
        gradient.addColorStop(1, '#d4a5a9');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawSparkle(p) {
        const twinkle = Math.sin(p.twinkle) * 0.3 + 0.7;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.globalAlpha = p.opacity * twinkle;
        
        const s = p.size;
        this.ctx.strokeStyle = 'rgba(232, 180, 184, 0.9)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s);
        this.ctx.lineTo(0, s);
        this.ctx.moveTo(-s, 0);
        this.ctx.lineTo(s, 0);
        this.ctx.moveTo(-s * 0.7, -s * 0.7);
        this.ctx.lineTo(s * 0.7, s * 0.7);
        this.ctx.moveTo(-s * 0.7, s * 0.7);
        this.ctx.lineTo(s * 0.7, -s * 0.7);
        this.ctx.stroke();
        
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            if (p.type === 'petal') this.drawPetal(p);
            else if (p.type === 'heart') this.drawHeart(p);
            else if (p.type === 'sparkle') this.drawSparkle(p);
            
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            if (p.twinkle !== undefined) p.twinkle += 0.08;
            
            if (p.y > this.canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * this.canvas.width;
            }
        });
        requestAnimationFrame(() => this.animate());
    }
}

// --- 页面切换逻辑 ---
function switchSection(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    
    current.style.opacity = '0';
    setTimeout(() => {
        current.classList.remove('active');
        current.style.opacity = '1';
        next.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (nextId === 'heart-wall') setTimeout(initHeartWall, 100);
    }, 500);
}

// --- 照片墙逻辑 (浪漫瀑布流升级版) ---
function initGallery() {
    const photoGrid = document.getElementById('photoGrid');
    if(photoGrid.children.length > 0) return;

    photoFiles.forEach((file, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        photoItem.style.animationDelay = `${index * 0.08}s`;
        
        const img = document.createElement('img');
        img.src = `images/${file}`;
        img.alt = `Memory`;
        img.onclick = () => openLightbox(index);
        
        img.onerror = function() {
            this.style.display = 'none';
        };
        
        photoItem.appendChild(img);
        photoGrid.appendChild(photoItem);
    });
}

// --- 手机适配版心形逻辑 ---
function generateHeartPositions(count) {
    const positions = [];
    const container = document.getElementById('heartContainer');
    const w = container.offsetWidth;
    const h = container.offsetHeight - 50; 
    
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? (w * 0.9) / 32 : (Math.min(w, h) * 0.015);
    
    for (let i = 0; i < count; i++) {
        const t = (i / count) * 2 * Math.PI + Math.PI;
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        positions.push({ 
            x: w/2 + x, 
            y: h/2 + y - (isMobile ? 30 : 0)
        });
    }
    return positions;
}

function initHeartWall() {
    const container = document.getElementById('heartContainer');
    const title = container.querySelector('.heart-title');
    const oldTitle = title ? title.cloneNode(true) : null;
    container.innerHTML = '';
    if (oldTitle) container.appendChild(oldTitle);
    
    const positions = generateHeartPositions(photoFiles.length);
    
    photoFiles.forEach((file, index) => {
        const div = document.createElement('div');
        div.className = 'heart-photo';
        div.style.left = Math.random() * window.innerWidth + 'px';
        div.style.top = Math.random() * window.innerHeight + 'px';
        div.style.opacity = 0;
        
        const img = document.createElement('img');
        img.src = `images/${file}`;
        div.appendChild(img);
        
        div.onclick = () => openLightbox(index);
        container.appendChild(div);
        
        setTimeout(() => {
            div.style.left = (positions[index].x - div.offsetWidth/2) + 'px';
            div.style.top = (positions[index].y - div.offsetHeight/2) + 'px';
            div.style.opacity = 1;
        }, 100 + index * 20);
    });
}

// --- Lightbox ---
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const counter = document.getElementById('imageCounter');
    
    img.src = `images/${photoFiles[index]}`;
    if(counter) counter.innerText = `${index + 1} / ${TOTAL_PHOTOS}`;
    lightbox.classList.add('active');
}

// --- 📥 下载贺卡功能 ---
function downloadCard() {
    const btn = document.getElementById('saveBtn');
    const originalText = btn.innerText;
    btn.innerText = "⏳ 正在生成精美信件...";
    
    const cardElement = document.getElementById('letter-content');
    
    html2canvas(cardElement, {
        backgroundColor: '#fffaf9',
        scale: 2, 
        useCORS: true,
        onclone: (clonedDoc) => {
            const clonedCard = clonedDoc.getElementById('letter-content');
            clonedCard.style.border = 'none';
            clonedCard.style.boxShadow = 'none';
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = '给LJZ的一封信.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        btn.innerText = "✅ 保存成功";
        setTimeout(() => btn.innerText = originalText, 2000);
    }).catch(err => {
        console.error(err);
        btn.innerText = "❌ 保存失败";
        alert("保存出错了，可能是浏览器限制，建议直接截屏哦！");
    });
}


// --- 启动 ---
document.addEventListener('DOMContentLoaded', () => {
    new RomanticParticleSystem();
    
    document.querySelector('.heart-container').addEventListener('click', () => {
        initGallery();
        switchSection('intro', 'gallery');
    });
    
    document.getElementById('toHeartBtn').addEventListener('click', () => {
        switchSection('gallery', 'heart-wall');
    });
    
    document.getElementById('toCardBtn').addEventListener('click', () => {
        switchSection('heart-wall', 'card');
    });
    
    document.getElementById('replayBtn').addEventListener('click', () => {
        switchSection('card', 'intro');
    });

    document.getElementById('saveBtn').addEventListener('click', downloadCard);
    
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('lightbox').classList.remove('active');
    });
    
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            document.getElementById('lightbox').classList.remove('active');
        }
    });
});
