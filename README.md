### Description

This is a simple Node.js and Python script for Broadlink SP2 Smart Plug
It will set up a web server on port 3000 and will listen to GET requests
It will send the request to the Python script and using the python-broadlink will turn on/off the SP2 smart plug.


### Requirements

1. `node.js`
1. `node.js express`
2. `node.js python-shell`
3. `python` (2.7)
4. `python-broadlink`

### Installation

1. `git clone https://github.com/NightRang3r/Broadlink-NodeSP2`
2. `sudo pip install broadlink`
3. `npm install python-shell`
4. `npm install express`


### Configuration


You will need to edit the "main.js" file lines 11 and 12 with the python and script path:

<pre>
pythonPath: '/usr/bin/python',
scriptPath: '/home/pi/sp2',
</pre>



### Python script:

You can test SP2 directly from the python script, it expects 3 arguments: IP, MAC, STATE:

`python sp2.py "SP2 IP ADDRESS"  "SP2 MAC ADDRESS"  "STATE"`

ON:

`python sp2.py 10.0.0.4 b443000000 1`

OFF:

`python sp2.py 10.0.0.4 b443000000 0`



### Run NodeSP2

`pi@raspberrypi:~/sp2 $ node main.js`


### Request Example (You can use a web browser as well):


`curl "http://[SERVERIP]:3000/?ip=["SP2 IP ADDRESS"]&mac=["SP2 MAC ADDRESS"]&state=[1]"`


ON:

`curl "http://10.0.0.20:3000/?ip=10.0.0.4&mac=b443000000&state=1"`

OFF:

`curl "http://10.0.0.20:3000/?ip=10.0.0.4&mac=b443000000&state=0"`


### Set as a service on a Raspberry PI


Create a file named NodeSP2.service:

<pre>

[Unit]
Description=NodeSP2
Wants=network.target
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/node /home/pi/sp2/main.js

[Install]
WantedBy=multi-user.target

</pre>

2. `cp NodeSP2.service /etc/systemd/system`
3. `systemctl daemon-reload`
4. `systemctl enable NodeSP2`
5. `systemctl start NodeSP2`


