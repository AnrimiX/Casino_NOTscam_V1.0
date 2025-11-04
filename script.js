const items = [
    { src: "img/hamster.jpg", name: "Хомяк", mult: 2 },
    { src: "img/knight.jpg", name: "Рыцарь", mult: 3 },
    { src: "img/shark.jpg", name: "Акула", mult: 4 }
];

const reels = [r1, r2, r3];
const spinBtn = spin;
const out = document.getElementById('out');

// звук вращения играет постоянно
const spinSound = new Audio('audio/bem.mp3');
spinSound.loop = true;
spinSound.play(); // сразу запускаем при загрузке страницы

// звук выигрыша
const winSound = new Audio('audio/win.mp3');
const loseSound = new Audio('audio/lose.mp3');

function getRandomItem() {
    return items[Math.floor(Math.random() * items.length)];
}

function createTrack(reel, finalItem) {
    reel.innerHTML = '';
    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.flexDirection = 'column';
    reel.appendChild(track);

    const spinCount = 15 + Math.floor(Math.random() * 10);
    for (let i = 0; i < spinCount; i++) {
        const img = document.createElement('img');
        img.src = getRandomItem().src;
        track.appendChild(img);
    }

    const finalImg = document.createElement('img');
    finalImg.src = finalItem.src;
    track.appendChild(finalImg);

    return track;
}

function spinReel(reel, delay = 0) {
    return new Promise(resolve => {
        const finalItem = getRandomItem();
        const track = createTrack(reel, finalItem);

        const totalHeight = track.scrollHeight - reel.clientHeight;

        track.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateY(-${totalHeight}px)`;

        setTimeout(() => {
            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                reel.innerHTML = `<img src="${finalItem.src}">`;
                resolve(finalItem);
            });
        }, delay);
    });
}

async function spinAll() {
    spinBtn.disabled = true;
    out.textContent = '🎰 Крутим...';

    const results = await Promise.all(reels.map((r, i) => spinReel(r, i * 200)));

    // проверка совпадений
    if (results[0].src === results[1].src && results[1].src === results[2].src) {
        out.textContent = `🎉 Комбо! Вы выиграли ${results[0].mult}×!`;
        reels.forEach(r => r.querySelector('img').classList.add('win'));
        winSound.currentTime = 0;
        winSound.play();
    } else {
        out.textContent = "😢 Попробуй ещё!";
        reels.forEach(r => r.querySelector('img').classList.remove('win'));
        loseSound.play();
    }

    spinBtn.disabled = false;
}

spinBtn.addEventListener('click', spinAll);

