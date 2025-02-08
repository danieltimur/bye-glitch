// Lustiges Jump and Run Spiel in JavaScript mit verbessertem Design

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 400;

let player = { x: 50, y: 300, width: 50, height: 30, dy: 0, gravity: 0.5, jumpPower: -10, grounded: false };

let obstacles = [{ x: 400, y: 350, width: 40, height: 40 }, { x: 700, y: 350, width: 40, height: 40 }];
let keys = {};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    try {
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
    } catch (error) {
        console.error('Fehler im Update-Loop:', error);
    }
}

function draw() {
    try {
        // Hintergrund zeichnen
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Himmelblau
        gradient.addColorStop(1, '#ffffff'); // Weiß
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Boden zeichnen
        ctx.fillStyle = '#654321';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
        
        // Spieler zeichnen mit Schatten
        ctx.fillStyle = 'red';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.shadowBlur = 0;
        
        // Hindernisse zeichnen
        ctx.fillStyle = 'green';
        obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
    } catch (error) {
        console.error('Fehler im Zeichen-Loop:', error);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
