from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample user data (you should use a database in a real application)
users = [
    {"username": "john_doe", "password": "password123", "transactions": [
        {"date": "2023-07-25", "description": "Purchase", "amount": -100},
        {"date": "2023-07-24", "description": "Deposit", "amount": 500},
    ],
    "checking": 1500,
    "savings": 5000},
    # Add more users here
    {"username": "jane_smith", "password": "123456", "transactions": [
        {"date": "2023-07-25", "description": "Purchase", "amount": -50},
        {"date": "2023-07-24", "description": "Deposit", "amount": 200},
    ],
    "checking": 2000,
    "savings": 3000},
    {"username": "bob_johnson", "password": "abc123", "transactions": [
        {"date": "2023-07-25", "description": "Purchase", "amount": -75},
        {"date": "2023-07-24", "description": "Deposit", "amount": 300},
    ],
    "checking": 1000,
    "savings": 10000},
]

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = next((user for user in users if user['username'] == username and user['password'] == password), None)

    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/banking_data')
def get_banking_data():
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)