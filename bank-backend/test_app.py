import json
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_success(client):
    # Replace with your actual username and password for successful login testing
    data = {'username': 'user', 'password': 'user123'}
    response = client.post('/login', data=json.dumps(data), content_type='application/json')
    assert response.status_code == 200
    assert b'Login successful' in response.data

def test_login_failure(client):
    # Replace with incorrect username and password for login failure testing
    data = {'username': 'hacker', 'password': 'hacker123'}
    response = client.post('/login', data=json.dumps(data), content_type='application/json')
    assert response.status_code == 401
    assert b'Invalid credentials' in response.data

def test_login_missing_credentials(client):
    # Test for missing username and password
    data = {}  # Empty data for missing credentials
    response = client.post('/login', data=json.dumps(data), content_type='application/json')
    assert response.status_code == 400
    assert b'Invalid credentials' in response.data
