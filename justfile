database_start:
    surreal start memory -A --auth --user root --pass root
database_create:
    surreal import --conn http://localhost:8000 --user root --pass root --ns test --db test ./database/create.surql
database:database_create
    surreal import --conn http://localhost:8000 --user root --pass root --ns test --db test ./database/insert.surql
adduser:
    curl --data-urlencode "name=sad" --data-urlencode "password=sad" --data-urlencode "email=sad@gmail.com" http://localhost:3000/register
loginuser:
    curl --data-urlencode "name=sad" --data-urlencode "password=sad" --data-urlencode "email=sad@gmail.com" http://localhost:3000/login
