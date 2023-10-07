# 1
Open video-server folder
# 2
In video-server folder, open cmd, type -> node server.js
If success = cmd -> Server berjalan di http://localhost:${port}
# 3
back in top folder / video-player-app folder
# 4
in video-player-app folder, open cmd, type -> npm start
if success = app start in localhost 3000
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