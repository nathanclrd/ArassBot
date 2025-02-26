import time
import requests

# Chemin vers le fichier de log du serveur Minecraft
LOG_FILE_PATH = ""
# Remplace par l'URL de ton webhook Discord
DISCORD_WEBHOOK_URL = ""

def send_to_discord(message):
    payload = {"content": message}
    requests.post(DISCORD_WEBHOOK_URL, json=payload)

def send_log():
    
    with open(LOG_FILE_PATH, "r", encoding="utf-8") as log_file:
        log_file.seek(0, 2)  
        while True:
            line = log_file.readline()
            if line:
                send_to_discord(line.strip())
            else:
                time.sleep(0.5)  

if __name__ == "__main__":
    send_log()