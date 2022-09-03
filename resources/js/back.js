var canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Create Particle
class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //Draw particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
    update(){
        if(this.y < 0){
            this.y = canvas.height;
        }
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 8000;
    for(let i = 0; i < numberOfParticles; i++){
        let size = (Math.random()*5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - size * 2) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - size * 2) + size * 2);
        let directionX = (Math.random() * 3) - 1.5;
        let directionY = (Math.random() * -1.5);
        let color = '#FFFFFF';

        particlesArray.push(new Particle(x, y, 0, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for(let i = 0; i <particlesArray.length; i++){
        particlesArray[i].update();
    }
}

window.addEventListener('resize',
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })

init();
animate();