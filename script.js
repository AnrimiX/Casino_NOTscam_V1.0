const i = [
  { src: "img/hamster.jpg", mult: 2 },
  { src: "img/knight.jpg", mult: 3 },
  { src: "img/shark.jpg", mult: 4 }
];
const r = [r1, r2, r3],
  b = spin,
  o = out,
  s = new Audio('audio/bem.mp3');
s.loop = 1;
s.play();

const w = new Audio('audio/win.mp3'),
  l = new Audio('audio/lose.mp3'),
  g = () => i[Math.random() * i.length | 0],
  c = (e, f) => {
    e.innerHTML = '';
    let d = document.createElement('div');
    d.style.display = 'flex';
    d.style.flexDirection = 'column';
    e.appendChild(d);
    for (let j = 15 + Math.random() * 10 | 0, m; j--;) {
      m = document.createElement('img');
      m.src = g().src;
      d.appendChild(m);
    }
    m = document.createElement('img');
    m.src = f.src;
    d.appendChild(m);
    return d;
  },
  p = (e, q = 0) => new Promise(z => {
    let f = g(),
      d = c(e, f),
      h = d.scrollHeight - e.clientHeight;
    d.style.transition = 'transform 1.5s cubic-bezier(0.25,1,0.5,1)';
    d.style.transform = `translateY(-${h}px)`;
    setTimeout(() => {
      d.addEventListener('transitionend', function n() {
        d.removeEventListener('transitionend', n);
        e.innerHTML = `<img src="${f.src}">`;
        z(f);
      });
    }, q);
  }),
  a = async () => {
    b.disabled = 1;
    o.textContent = '🎰 Крутим...';
    let t = await Promise.all(r.map((e, q) => p(e, q * 200)));
    if (t[0].src === t[1].src && t[1].src === t[2].src) {
      o.textContent = `🎉 Комбо! Вы выиграли ${t[0].mult}×!`;
      r.forEach(e => e.querySelector('img').classList.add('win'));
      w.currentTime = 0;
      w.play();
    } else {
      o.textContent = "😢 Попробуй ещё!";
      r.forEach(e => e.querySelector('img').classList.remove('win'));
      l.play();
    }
    b.disabled = 0;
  };

b.onclick = a;

# V1.0 By AnrimiX_
