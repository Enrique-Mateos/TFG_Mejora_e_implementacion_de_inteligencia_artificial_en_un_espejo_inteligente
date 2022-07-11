import requests
from time import sleep

res = requests.get('http://192.168.1.100/26/on')
print(res)

sleep(20) # Time in seconds

res = requests.get('http://192.168.1.100/26/off')
print(res)



