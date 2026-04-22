const books = [
    {
        id: 1,
        title: '追风筝的人',
        author: '卡勒德·胡赛尼',
        cover: 'img/book1.jpg',
        rating: 4.8,
        category: 'novel',
        duration: '12.5小时',
        chapters: 32,
        description: '12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事...',
        hot: true,
        new: false,
        price: 0
    },
    {
        id: 2,
        title: '百年孤独',
        author: '加西亚·马尔克斯',
        cover: 'img/book2.jpg',
        rating: 4.9,
        category: 'novel',
        duration: '18.2小时',
        chapters: 45,
        description: '布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰...',
        hot: true,
        new: false,
        price: 29.9
    },
    {
        id: 3,
        title: '人类简史',
        author: '尤瓦尔·赫拉利',
        cover: 'img/book3.jpg',
        rating: 4.7,
        category: 'science',
        duration: '15.8小时',
        chapters: 38,
        description: '从认知革命到农业革命，再到科学革命，本书讲述了人类从石器时代到21世纪的演化历史...',
        hot: true,
        new: true,
        price: 39.9
    },
    {
        id: 4,
        title: '三体',
        author: '刘慈欣',
        cover: 'img/book4.jpg',
        rating: 4.9,
        category: 'science',
        duration: '22.5小时',
        chapters: 56,
        description: '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划"红岸工程"取得了突破性进展...',
        hot: true,
        new: false,
        price: 49.9
    },
    {
        id: 5,
        title: '活着',
        author: '余华',
        cover: 'img/book5.jpg',
        rating: 4.8,
        category: 'novel',
        duration: '8.5小时',
        chapters: 24,
        description: '讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，可他嗜赌如命，终于赌光了家业...',
        hot: true,
        new: true,
        price: 0
    },
    {
        id: 6,
        title: '明朝那些事儿',
        author: '当年明月',
        cover: 'img/book6.jpg',
        rating: 4.7,
        category: 'history',
        duration: '45.6小时',
        chapters: 120,
        description: '以史料为基础，以年代和具体人物为主线，并加入了小说的笔法，对明朝十七帝和其他王公权贵...',
        hot: true,
        new: false,
        price: 59.9
    },
    {
        id: 7,
        title: '小王子',
        author: '安托万·德·圣-埃克苏佩里',
        cover: 'img/book7.jpg',
        rating: 4.9,
        category: 'novel',
        duration: '3.2小时',
        chapters: 27,
        description: '小王子是一个超凡脱俗的仙童，他住在一颗只比他大一丁点儿的小行星上...',
        hot: false,
        new: true,
        price: 0
    },
    {
        id: 8,
        title: '穷查理宝典',
        author: '查理·芒格',
        cover: 'img/book8.jpg',
        rating: 4.6,
        category: 'business',
        duration: '20.3小时',
        chapters: 42,
        description: '查理·芒格的智慧箴言录，收录了芒格过去20年来主要的公开演讲...',
        hot: true,
        new: false,
        price: 69.9
    },
    {
        id: 9,
        title: '围城',
        author: '钱钟书',
        cover: 'img/book9.jpg',
        rating: 4.7,
        category: 'novel',
        duration: '10.8小时',
        chapters: 28,
        description: '故事主要写抗战初期知识分子的群相。围城故事发生于1920到1940年代...',
        hot: false,
        new: false,
        price: 19.9
    },
    {
        id: 10,
        title: '红楼梦',
        author: '曹雪芹',
        cover: 'img/book10.jpg',
        rating: 4.9,
        category: 'novel',
        duration: '56.2小时',
        chapters: 120,
        description: '中国古代章回体长篇小说，中国古典四大名著之首，一般认为是清代作家曹雪芹所著...',
        hot: true,
        new: false,
        price: 0
    }
];

let currentBook = null;
let isPlaying = false;
let currentTime = 0;
let totalTime = 0;
let playbackSpeed = 1;
let volume = 80;
let timerMinutes = 0;
let timerInterval = null;
let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let history = JSON.parse(localStorage.getItem('history')) || [];

function init() {
    loadDarkMode();
    renderHotBooks();
    renderNewBooks();
    renderRecommendBooks();
    renderCategoryBooks();
    renderSearchResults();
    renderBookshelf();
    renderHistory();
    renderFavorites();
    renderDownloads();
    renderChapterList();
    setupEventListeners();
}

function loadDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.documentElement.classList.add('dark');
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

function createBookCard(book) {
    const isFavorite = favorites.includes(book.id);
    const inBookshelf = bookshelf.some(b => b.id === book.id);
    
    return `
        <div class="book-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div class="relative">
                <a href="detail.html" class="block">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover">
                </a>
                ${book.hot ? '<span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">热门</span>' : ''}
                ${book.new ? '<span class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">新</span>' : ''}
                ${book.price === 0 ? '<span class="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">免费</span>' : ''}
            </div>
            <div class="p-4">
                <h3 class="font-medium text-gray-800 dark:text-white mb-1 truncate">${book.title}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">${book.author}</p>
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center">
                        <i class="fas fa-star text-yellow-400 text-sm"></i>
                        <span class="ml-1 text-gray-700 dark:text-gray-300 text-sm">${book.rating}</span>
                    </div>
                    <span class="text-gray-500 dark:text-gray-400 text-xs">${book.duration}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-primary font-medium">${book.price === 0 ? '免费' : '¥' + book.price}</span>
                    <div class="flex items-center space-x-2">
                        <button onclick="toggleFavorite(${book.id})" class="text-gray-400 hover:text-red-500 transition ${isFavorite ? 'text-red-500' : ''}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button onclick="addToBookshelf(${book.id})" class="text-gray-400 hover:text-primary transition ${inBookshelf ? 'text-primary' : ''}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHotBooks() {
    const container = document.getElementById('hotBooks');
    if (container) {
        const hotBooks = books.filter(book => book.hot).slice(0, 5);
        container.innerHTML = hotBooks.map(book => createBookCard(book)).join('');
    }
}

function renderNewBooks() {
    const container = document.getElementById('newBooks');
    if (container) {
        const newBooks = books.filter(book => book.new).slice(0, 5);
        container.innerHTML = newBooks.map(book => createBookCard(book)).join('');
    }
}

function renderRecommendBooks() {
    const container = document.getElementById('recommendBooks');
    if (container) {
        container.innerHTML = books.slice(0, 5).map(book => createBookCard(book)).join('');
    }
}

function renderCategoryBooks() {
    const container = document.getElementById('bookGrid');
    if (container) {
        container.innerHTML = books.map(book => createBookCard(book)).join('');
    }
}

function renderSearchResults() {
    const container = document.getElementById('searchResults');
    if (container) {
        container.innerHTML = books.map(book => createBookCard(book)).join('');
    }
}

function renderBookshelf() {
    const container = document.getElementById('bookshelfBooks');
    if (container && bookshelf.length > 0) {
        container.innerHTML = bookshelf.map(book => createBookCard(book)).join('');
    } else if (container) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">书架空空如也，快去添加书籍吧！</p>';
    }
}

function renderHistory() {
    const container = document.getElementById('historyList');
    if (container) {
        if (history.length > 0) {
            container.innerHTML = history.map(item => `
                <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <img src="${item.book.cover}" alt="${item.book.title}" class="w-16 h-20 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-800 dark:text-white">${item.book.title}</h4>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">${item.book.author}</p>
                        <div class="flex items-center mt-2">
                            <div class="flex-1 bg-gray-200 rounded-full h-2">
                                <div class="bg-primary h-2 rounded-full" style="width: ${item.progress}%"></div>
                            </div>
                            <span class="ml-2 text-gray-600 dark:text-gray-400 text-xs">${item.progress}%</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-gray-500 dark:text-gray-400 text-xs">${item.date}</p>
                        <button onclick="playBook(${item.book.id})" class="mt-2 text-primary hover:text-blue-700">
                            <i class="fas fa-play-circle text-2xl"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400 py-8">暂无收听历史</p>';
        }
    }
}

function renderFavorites() {
    const container = document.getElementById('favoritesBooks');
    if (container) {
        const favoriteBooks = books.filter(book => favorites.includes(book.id));
        if (favoriteBooks.length > 0) {
            container.innerHTML = favoriteBooks.map(book => createBookCard(book)).join('');
        } else {
            container.innerHTML = '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">暂无收藏</p>';
        }
    }
}

function renderDownloads() {
    const container = document.getElementById('downloadsList');
    if (container) {
        container.innerHTML = `
            <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img src="img/book.jpg" alt="书籍封面" class="w-12 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800 dark:text-white">追风筝的人</h4>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">第1-5章</p>
                    <div class="flex items-center mt-2">
                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 60%"></div>
                        </div>
                        <span class="ml-2 text-gray-600 dark:text-gray-400 text-xs">60%</span>
                    </div>
                </div>
                <div class="text-right">
                    <button class="text-gray-400 hover:text-primary">
                        <i class="fas fa-pause"></i>
                    </button>
                </div>
            </div>
            <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img src="img/book.jpg" alt="书籍封面" class="w-12 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800 dark:text-white">百年孤独</h4>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">第1-10章</p>
                    <div class="flex items-center mt-2">
                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                        </div>
                        <span class="ml-2 text-green-500 text-xs">完成</span>
                    </div>
                </div>
                <div class="text-right">
                    <button class="text-gray-400 hover:text-red-500">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }
}

function renderChapterList() {
    const container = document.getElementById('chapterList');
    if (container) {
        let chapters = '';
        for (let i = 1; i <= 32; i++) {
            const isActive = i === 1 ? 'active' : '';
            chapters += `
                <div class="chapter-item ${isActive} flex items-center justify-between p-3 rounded-lg cursor-pointer" onclick="playChapter(${i})">
                    <div class="flex items-center space-x-3">
                        <span class="text-gray-500 dark:text-gray-400 text-sm w-8">${i}</span>
                        <span class="text-gray-800 dark:text-white">第${i}章</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-gray-500 dark:text-gray-400 text-xs">25:18</span>
                        ${i === 1 ? '<i class="fas fa-play text-primary text-sm"></i>' : ''}
                    </div>
                </div>
            `;
        }
        container.innerHTML = chapters;
    }
}

function setupEventListeners() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', playPrevious);
    }

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.addEventListener('click', seekTo);
    }

    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', changeVolume);
    }

    const speedBtn = document.getElementById('speedBtn');
    if (speedBtn) {
        speedBtn.addEventListener('click', cycleSpeed);
    }

    const timerBtn = document.getElementById('timerBtn');
    if (timerBtn) {
        timerBtn.addEventListener('click', toggleTimer);
    }

    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            authTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            const tabName = e.target.dataset.tab;
            document.getElementById('loginForm').classList.toggle('hidden', tabName !== 'login');
            document.getElementById('registerForm').classList.toggle('hidden', tabName !== 'register');
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterBooks(e.target.dataset.filter);
        });
    });

    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            viewBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            toggleView(e.target.dataset.view);
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const tabName = e.target.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabName).classList.remove('hidden');
        });
    });

    const starRating = document.querySelectorAll('.star-rating i');
    starRating.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.dataset.rating);
            starRating.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    const playIcon = document.getElementById('playIcon');
    if (playIcon) {
        playIcon.className = isPlaying ? 'fas fa-pause text-3xl' : 'fas fa-play text-3xl';
    }
    if (isPlaying) {
        startProgressSimulation();
    } else {
        stopProgressSimulation();
    }
}

function playPrevious() {
    console.log('播放上一章');
}

function playNext() {
    console.log('播放下一章');
}

function seekTo(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    currentTime = (totalTime * percent) / 100;
    updateProgress();
}

function changeVolume(event) {
    volume = event.target.value;
    console.log('音量:', volume);
}

function cycleSpeed() {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    playbackSpeed = speeds[(currentIndex + 1) % speeds.length];
    const speedBtn = document.getElementById('speedBtn');
    if (speedBtn) {
        speedBtn.innerHTML = `<span class="text-xs font-medium">${playbackSpeed}x</span>`;
    }
}

function toggleTimer() {
    if (timerMinutes > 0) {
        timerMinutes = 0;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        alert('定时关闭已取消');
    } else {
        timerMinutes = 30;
        alert('将在30分钟后自动关闭播放');
        timerInterval = setInterval(() => {
            timerMinutes--;
            if (timerMinutes <= 0) {
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
                togglePlayPause();
                alert('定时关闭已触发');
            }
        }, 60000);
    }
}

function startProgressSimulation() {
    totalTime = 1518;
    if (!window.progressInterval) {
        window.progressInterval = setInterval(() => {
            if (currentTime < totalTime) {
                currentTime++;
                updateProgress();
            }
        }, 1000);
    }
}

function stopProgressSimulation() {
    if (window.progressInterval) {
        clearInterval(window.progressInterval);
        window.progressInterval = null;
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    
    if (progressFill) {
        const percent = (currentTime / totalTime) * 100;
        progressFill.style.width = percent + '%';
    }
    
    if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    if (totalTimeEl) {
        totalTimeEl.textContent = formatTime(totalTime);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function playBook(bookId) {
    const book = books.find(b => b.id === bookId) || books[0];
    currentBook = book;
    
    const playerTitle = document.getElementById('playerTitle');
    const playerAuthor = document.getElementById('playerAuthor');
    const playerCover = document.getElementById('playerCover');
    
    if (playerTitle) playerTitle.textContent = book.title;
    if (playerAuthor) playerAuthor.textContent = book.author;
    if (playerCover) playerCover.src = book.cover;
    
    if (!isPlaying) {
        togglePlayPause();
    }
    
    addToHistory(book);
}

function playChapter(chapterNumber) {
    console.log('播放第', chapterNumber, '章');
    currentTime = 0;
    totalTime = 1518;
    updateProgress();
    
    const chapterItems = document.querySelectorAll('.chapter-item');
    chapterItems.forEach((item, index) => {
        if (index + 1 === chapterNumber) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function addToBookshelf(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && !bookshelf.some(b => b.id === bookId)) {
        bookshelf.push(book);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        alert('已添加到书架');
        renderBookshelf();
    } else if (bookshelf.some(b => b.id === bookId)) {
        bookshelf = bookshelf.filter(b => b.id !== bookId);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        alert('已从书架移除');
        renderBookshelf();
    }
}

function toggleFavorite(bookId) {
    const index = favorites.indexOf(bookId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(bookId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderHotBooks();
    renderNewBooks();
    renderRecommendBooks();
    renderCategoryBooks();
    renderSearchResults();
    renderBookshelf();
    renderFavorites();
}

function addToHistory(book) {
    const existingIndex = history.findIndex(h => h.book.id === book.id);
    if (existingIndex > -1) {
        history.splice(existingIndex, 1);
    }
    
    history.unshift({
        book: book,
        progress: Math.floor(Math.random() * 100),
        date: new Date().toLocaleDateString()
    });
    
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function filterBooks(category) {
    const container = document.getElementById('bookGrid');
    if (container) {
        let filteredBooks = books;
        if (category !== 'all') {
            filteredBooks = books.filter(book => book.category === category);
        }
        container.innerHTML = filteredBooks.map(book => createBookCard(book)).join('');
    }
}

function toggleView(view) {
    const container = document.getElementById('bookGrid');
    if (container) {
        if (view === 'list') {
            container.className = 'space-y-4';
        } else {
            container.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6';
        }
    }
}

document.addEventListener('DOMContentLoaded', init);