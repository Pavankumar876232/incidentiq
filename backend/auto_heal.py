import docker
import time
import requests

client = docker.from_env()

BACKEND_CONTAINER = "incidentiq-backend"
CHECK_INTERVAL = 10

def restart_backend():
    print("🔁 Restarting backend...")
    container = client.containers.get(BACKEND_CONTAINER)
    container.restart()

while True:
    try:
        res = requests.get("http://backend:8000/health", timeout=3)
        if res.status_code != 200:
            print("❌ Backend unhealthy")
            restart_backend()
        else:
            print("✅ Backend OK")
    except:
        print("❌ Backend DOWN")
        restart_backend()

    time.sleep(CHECK_INTERVAL)