# from cryptography.fernet import Fernet
# key = Fernet.generate_key()
# print(key.decode())
from upload_to_server import upload_media

url = upload_media("TestImg.png", "Images")
print(url)