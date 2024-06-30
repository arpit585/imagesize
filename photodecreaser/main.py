from flask import Flask, request, jsonify, send_file
from PIL import Image
import io
import base64

app = Flask(__name__)
@app.route('/test')
def app():
    return 'hello world'


@app.route('/')
def index():
    return app.send_static_file('test.html')

@app.route('/resize', methods=['POST'])
def resize_image():
    data = request.get_json()
    image_src = data['imageSrc']

    # Remove the 'data:image/jpeg;base64,' prefix
    image_data = image_src.split(',')[1]

    # Convert base64 to bytes
    image_bytes = base64.b64decode(image_data)

    # Open bytes as PIL Image
    image = Image.open(io.BytesIO(image_bytes))

    # Resize image (example: resize to 800x600)
    resized_image = image.resize((800, 600))

    # Save resized image to bytes
    output = io.BytesIO()
    resized_image.save(output, format='JPEG')
    output.seek(0)

    return send_file(output, mimetype='image/jpeg', as_attachment=True, download_name='resized_image.jpg')

if __name__ == '__main__':
    app.run(debug=True)
