var canvas = document.getElementById("stars");
var ctx = canvas.getContext("2d");
var moonX = canvas.width - 100;
var moonY = 100;
var moonRadius = 50;
var moonPhase = 0.5;
var scrollingText = document.getElementById("scrolling-text");
var message = "Always and Forever";
var speed = 50; // pixels per second
var typeWriter = document.getElementById('poem');

const poem = "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze."

const poemContainer = document.getElementById('poem');
poemContainer.innerText = poem;

function typeWriter() {
  const speed = 100; // speed in milliseconds
  let i = 0;
  const poemText = poem.innerText;
  poem.innerText = '';
  const timer = setInterval(function() {
    if (i < poemText.length) {
      poem.innerText += poemText.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

function scrollText() {
  scrollingText.style.left = parseInt(scrollingText.style.left) - speed / 60 + "px";
  if (parseInt(scrollingText.style.left) + scrollingText.offsetWidth < 0) {
    scrollingText.style.left = window.innerWidth + "px";
  }
}

setInterval(scrollText, 1000 / 60);


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawMoon() {
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
  var gradient = ctx.createRadialGradient(moonX, moonY, moonRadius / 4, moonX, moonY, moonRadius);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(moonPhase, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(moonPhase, "rgba(0, 0, 0, 1)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
  ctx.fillStyle = gradient;
  ctx.fill();
  moonPhase += 0.01;
  if (moonPhase > 1) {
    moonPhase = 0;
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var numStars = Math.floor(Math.random() * 200) + 100;
  for (var i = 0; i < numStars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var size = Math.random() * 3 + 1;
    var brightness = Math.random() * 50 + 50;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, " + brightness / 100 + ")";
    ctx.fill();
  }
}

function twinkleStars(event) {
  var mouseX = event.clientX - canvas.offsetLeft;
  var mouseY = event.clientY - canvas.offsetTop;
  var star = ctx.getImageData(mouseX, mouseY, 1, 1);
  var alpha = star.data[3];
  if (alpha > 0) {
    star.data[3] = Math.max(alpha - 50, 0);
    ctx.putImageData(star, mouseX, mouseY);
  }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener("mousemove", twinkleStars);
window.addEventListener('load', function() {
  const poemContainer = document.getElementById('poem-container');
  const poemHeight = poemContainer.clientHeight;
  const windowHeight = window.innerHeight;
  let currentY = 0;
  let direction = 'down';

  setInterval(function() {
    if (direction === 'down') {
      currentY++;
      poemContainer.style.transform = `translate(-50%, ${currentY}px)`;
    } else {
      currentY--;
      poemContainer.style.transform = `translate(-50%, ${currentY}px)`;
    }

    if (currentY >= windowHeight - poemHeight / 2) {
      direction = 'up';
      typeWriter();
    } else if (currentY <= 0) {
      direction = 'down';
    }
  }, 50); // speed in milliseconds
});




setInterval(function() {
  drawStars();
  drawMoon();
}, 2000);
