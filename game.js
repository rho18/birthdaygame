const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let gravity = 0.5;

let player = {
  x: 100,
  y: 100,
  w: 30,
  h: 30,
  dx: 0,
  dy: 0,
  jumping: false
};

let world = [];

for (let i = 0; i < 50; i++) {
  world.push({
    x: i * 40,
    y: canvas.height - 40,
    w: 40,
    h: 40
  });
}

function drawPlayer() {
  ctx.fillStyle = "pink";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawWorld() {
  ctx.fillStyle = "#7CFC00";
  world.forEach(block => {
    ctx.fillRect(block.x, block.y, block.w, block.h);
  });
}

function update() {
  player.dy += gravity;
  player.y += player.dy;
  player.x += player.dx;

  world.forEach(block => {
    if (
      player.x < block.x + block.w &&
      player.x + player.w > block.x &&
      player.y < block.y + block.h &&
      player.y + player.h > block.y
    ) {
      player.dy = 0;
      player.jumping = false;
      player.y = block.y - player.h;
    }
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWorld();
  drawPlayer();
  update();
  requestAnimationFrame(animate);
}

animate();

function moveLeft() {
  player.dx = -3;
  setTimeout(() => player.dx = 0, 200);
}

function moveRight() {
  player.dx = 3;
  setTimeout(() => player.dx = 0, 200);
}

function jump() {
  if (!player.jumping) {
    player.dy = -10;
    player.jumping = true;
  }
}

canvas.addEventListener("click", e => {
  world.push({
    x: e.clientX - 20,
    y: e.clientY - 20,
    w: 40,
    h: 40
  });
});
