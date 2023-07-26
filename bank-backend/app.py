from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace this with your actual authentication logic
def authenticate(username, password):
    # For simplicity, we'll assume that the username and password are hardcoded here.
    # In a real application, you should use a secure authentication mechanism and store
    # user data securely in a database.
    valid_username = 'user'
    valid_password = 'user123'
    return username == valid_username and password == valid_password

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Invalid credentials'}), 400

    if authenticate(username, password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)