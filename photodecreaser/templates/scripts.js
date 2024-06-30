document.getElementById('resize').addEventListener('click', function() {
    const fileInput = document.getElementById('upload');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('download');
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const ctx = canvas.getContext('2d');
                const scaleFactor = 0.5; // Scale factor to reduce the image size by half
                
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    downloadLink.href = url;
                    downloadLink.style.display = 'block';
                    canvas.style.display = 'block';
                }, 'image/png');
            };
            img.src = event.target.result;
        };
        
        reader.readAsDataURL(fileInput.files[0]);
    }
});
