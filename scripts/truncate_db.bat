@echo off
echo Truncating tables...

docker-compose exec db psql -U postgres -d cmsdb -c "TRUNCATE \"TwoFactorMethod\", \"User\" CASCADE;"

echo Done!
pause
