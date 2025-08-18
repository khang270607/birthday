// ======= Confetti đơn giản =======
const cvs = document.getElementById("confetti");
const ctx = cvs.getContext("2d");
let W,
    H,
    confs = [];
function resize() {
    W = cvs.width = innerWidth;
    H = cvs.height = innerHeight;
}
addEventListener("resize", resize);
resize();

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function makeConfetti(n = 180) {
    for (let i = 0; i < n; i++) {
        confs.push({
            x: rand(0, W),
            y: rand(-H * 0.2, -20),
            r: rand(3, 6),
            c: `hsl(${~~rand(0, 360)}, 90%, ${~~rand(50, 70)}%)`,
            vx: rand(-1, 1),
            vy: rand(2, 4),
            rot: rand(0, 360),
            vr: rand(-4, 4),
        });
    }
}

function tick() {
    ctx.clearRect(0, 0, W, H);
    confs.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > H + 20) {
            p.y = -10;
            p.x = rand(0, W);
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
        ctx.restore();
    });
    requestAnimationFrame(tick);
}
tick();

document.getElementById("btnConfetti").addEventListener("click", () => {
    makeConfetti(260);
});

// ======= Nhập lời chúc tuỳ chỉnh =======
document.getElementById("btnWish").addEventListener("click", () => {
    const msg = prompt("Nhập lời chúc bạn muốn gửi tới Ngân:");
    if (msg) {
        const box = document.getElementById("wishBox");
        const p = document.createElement("p");
        p.innerHTML = "💌 " + msg;
        p.style.marginTop = "8px";
        box.appendChild(p);
        makeConfetti(120);
    }
});

// ======= Kéo & thả ảnh vào khung =======
const photo = document.getElementById("photo");
["dragenter", "dragover"].forEach((evt) =>
    photo.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        photo.style.outline = "3px dashed rgba(0,0,0,.25)";
    })
);
["dragleave", "drop"].forEach((evt) =>
    photo.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        photo.style.outline = "none";
    })
);
photo.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
        alert("Vui lòng thả tệp ảnh (jpg/png).");
        return;
    }
    const img = new Image();
    img.onload = () => {
        photo.innerHTML = "";
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.display = "block";
        photo.appendChild(img);
    };
    img.src = URL.createObjectURL(file);
});

// Tự bắn pháo nhẹ khi mở trang
makeConfetti(100);
