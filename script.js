// Lustiges Jump and Run Spiel in JavaScript

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 400;

type Player = { x: number, y: number, width: number, height: number, dy: number, gravity: number, jumpPower: number, grounded: boolean };
let player = { x: 50, y: 300, width: 30, height: 30, dy: 0, gravity: 0.5, jumpPower: -10, grounded: false };

let obstacles = [{ x: 400, y: 350, width: 40, height: 40 }, { x: 700, y: 350, width: 40, height: 40 }];
let keys = {};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    // Gravitation
    if (!player.grounded) {
        player.dy += player.gravity;
    }
    
    player.y += player.dy;
    
    // Begrenzung auf den Boden
    if (player.y + player.height >= canvas.height - 50) {
        player.y = canvas.height - 50 - player.height;
        player.dy = 0;
        player.grounded = true;
    } else {
        player.grounded = false;
    }
    
    // Springen
    if (keys['Space'] && player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
    }
    
    // Bewegung der Hindernisse
    obstacles.forEach(obstacle => {
        obstacle.x -= 3;
        if (obstacle.x + obstacle.width < 0) {
            obstacle.x = canvas.width;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Spieler zeichnen
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Hindernisse zeichnen
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
