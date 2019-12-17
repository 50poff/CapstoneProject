docker run -p 3306:3306 -p 80:3000 -d --name DaiHire team_bold_capstone   /bin/sh -c "service mysql start; while true; do sleep 24h;done"
