import subprocess
import time
import requests
import pyperclip

# Step 1: Run Flask app in a new terminal
subprocess.Popen(["start", "cmd", "/k", "python app.py"], shell=True)

# Step 2: Run ngrok in a new terminal
subprocess.Popen(["start", "cmd", "/k", "ngrok http 5000"], shell=True)

# Step 3: Wait for ngrok to start and fetch the public URL
time.sleep(5)  # Give ngrok some time to start

ngrok_api_url = "http://127.0.0.1:4040/api/tunnels"
public_url = None

for _ in range(20):  # Retry for a few seconds
    try:
        response = requests.get(ngrok_api_url).json()
        public_url = response['tunnels'][0]['public_url']
        break  # Exit loop if URL is found
    except (requests.exceptions.RequestException, KeyError, IndexError):
        time.sleep(0.7)  # Wait and retry if ngrok isn't ready yet

if public_url:
    # Copy to clipboard
    pyperclip.copy(public_url)
    print("Public URL copied to clipboard!")
else:
    print("Failed to get public URL from ngrok.")
