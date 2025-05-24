let total = 0;
let dailyGoal = 3000;

const motivationalMessages = [
    "Seni çok seviyorum Seray 💖",
    "Günaydın Seray'cım! Yeni bir güne başlıyoruz 🌸",
    "Su içmeyi unutma tatlım! 💖",
    "Günlük hedefine yaklaşıyorsun, harikasın! ✨",
    "Kendine iyi baktığın için çok mutluyum 💝",
    "Su içmek cildini güzelleştirir! 💫",
    "Sağlıklı bir yaşam için su çok önemli! 🌊",
    "Bugün kendine iyi bak Seray'cım! 🎀",
    "Bir bardak su ile tazelen! 💦",
    "Her yudumda sağlığına sağlık katıyorsun! 🥰",
    "Az kaldı, hedefine ulaşacaksın! 🚀",
    "Küçük adımlar büyük değişimler yaratır! 🌱",
    "Su içmek enerjini artırır! ⚡",
    "Harika gidiyorsun, pes etme! 🙌",
    "Bugün de kendin için güzel bir şey yaptın! 🌷",
    "Unutma, sen çok değerlisin! 💎",
    "Biraz su, biraz mutluluk! 😊",
    "Her yudumda kendine yatırım yapıyorsun! 💸",
    "Vücudun sana teşekkür edecek! 🙏",
    "Su içmek alışkanlık, sağlık ise ödül! 🏆",
    "Kendini sev, su iç! 💗"
];

// DOM elementlerini seç
const totalDisplay = document.getElementById("total");
const dailyGoalInput = document.getElementById("dailyGoalInput");
const currentGoalDisplay = document.getElementById("currentGoal");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const motivationMessage = document.getElementById("motivationMessage");

// Su ekleme fonksiyonu
function addWater(amount) {
    total += amount;
    updateDisplay();
    showWaterDropAnimation();
    showRandomMotivation();
    saveProgress();
}

// Ekranı güncelle
function updateDisplay() {
    totalDisplay.textContent = total;
    const percentage = Math.min((total / dailyGoal) * 100, 100);
    progressBar.style.width = percentage + "%";
    progressText.textContent = Math.round(percentage) + "%";
}

// Su damlası animasyonu
function showWaterDropAnimation() {
    const drop = document.createElement('div');
    drop.className = 'water-drop-anim';
    drop.textContent = '💧';
    document.body.appendChild(drop);

    setTimeout(() => {
        drop.remove();
    }, 1000);
}

// Rastgele motivasyon mesajı
function showRandomMotivation() {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    motivationMessage.textContent = motivationalMessages[randomIndex];
}

// Hedefi kaydet
function saveDailyGoal() {
    const newGoal = parseInt(dailyGoalInput.value);
    if (newGoal >= 500) {
        dailyGoal = newGoal;
        currentGoalDisplay.textContent = dailyGoal;
        updateDisplay();
        localStorage.setItem('dailyGoal', dailyGoal);
        showToast('Yeni hedefin kaydedildi! 🎯');
    } else {
        showToast('Lütfen en az 500ml bir hedef belirle! 💦');
    }
}

// Toast bildirimi göster
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// İlerlemeyi kaydet
function saveProgress() {
    localStorage.setItem('waterTotal', total);
}

// İlerlemeyi yükle
function loadProgress() {
    const savedTotal = localStorage.getItem('waterTotal');
    const savedGoal = localStorage.getItem('dailyGoal');
    
    if (savedTotal) {
        total = parseInt(savedTotal);
        updateDisplay();
    }
    
    if (savedGoal) {
        dailyGoal = parseInt(savedGoal);
        dailyGoalInput.value = dailyGoal;
        currentGoalDisplay.textContent = dailyGoal;
    }
}

// Günlük toplamı sıfırla
function resetTotal() {
    total = 0;
    updateDisplay();
    saveProgress();
    showToast('İçilen su sıfırlandı! 💧');
}

// Sayfa yüklendiğinde
window.addEventListener('load', () => {
    loadProgress();
    showRandomMotivation();
    // Eğer kullanıcı daha önce tema seçmediyse, sistem temasını uygula
    if (!localStorage.getItem('theme')) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-toggle').textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('theme-toggle').textContent = '🌙';
        }
    }
    autoDarkModeByTime();
    setInterval(autoDarkModeByTime, 60 * 60 * 1000); // Her saat başı kontrol
});

// Her gece yarısı toplamı sıfırla
function checkDayReset() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetTotal();
    }
}

setInterval(checkDayReset, 60000); // Her dakika kontrol et

function toggleDarkMode() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('theme-toggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('themeSelected', 'true');
}

// Otomatik geçişte kontrol:
function autoDarkModeByTime() {
    if (localStorage.getItem('themeSelected') === 'true') return;
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 7) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle').textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('theme-toggle').textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}