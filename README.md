# 1
Open video-server folder
# 2
In video-server folder, open cmd, type -> node server.js
# 3
back in top folder / video-player-app folder
# 4
in video-player-app folder, open cmd, type -> npm start
# 5
Test in postman 
get video = http://ip:4000/checkVideoStatus
put video = http://ip:4000/updateVideoStatus , body = raw json
{
  "status": "playing"
}
or
{
  "status": "waiting"
}
# 6 
enjoy it ...
