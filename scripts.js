// Shared Space Terminal Background Script
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let time = 0;
    const size = 32; 

    function resize() {
        canvas.width = window.innerWidth / size;
        canvas.height = window.innerHeight / size;
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                const noise = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 - time) * 0.5 + 0.5;
                const wave = Math.sin(Math.sqrt(x*x + y*y) * 0.1 - time * 2) * 0.5 + 0.5;
                const value = (noise + wave) / 2;
                
                data[i] = value * 255; 
                data[i + 1] = (1 - value) * 50; 
                data[i + 2] = Math.sin(time + value) * 128 + 128; 
                data[i + 3] = 255; 
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        time += 0.02;
        requestAnimationFrame(draw);
    }
    draw();
}
