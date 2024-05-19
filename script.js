// script.js
window.addEventListener('load', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidth = document.getElementById('lineWidth');
    const clearButton = document.getElementById('clearButton');
    const coordinates = document.getElementById('coordinates');

    let painting = false;
    let coordinatesList = [];

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
        coordinatesList.push('End of Path');
        updateCoordinatesDisplay();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = lineWidth.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;

        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        coordinatesList.push(`(${x}, ${y})`);
    }

    function updateCoordinatesDisplay() {
        coordinates.value = coordinatesList.join('\n');
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        coordinatesList = [];
        updateCoordinatesDisplay();
    });
});
