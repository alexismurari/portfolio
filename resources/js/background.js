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
        ctx.fillStyle = '#008000';
        ctx.fill();
    }
    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
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
        let directionY = (Math.random() * 3) - 1.5;
        let color = '#008000';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect(){
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = 0; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.width/10) * (canvas.height/10)){
                ctx.strokeStyle = 'rgba(0,120,0,1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for(let i = 0; i <particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize',
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })


init();
animate();