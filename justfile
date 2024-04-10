database_start:
    surreal start memory -A --auth --user root --pass root
database_create:
    surreal import --conn http://localhost:8000 --user root --pass root --ns test --db test ./database/create.surql
database:database_create
    surreal import --conn http://localhost:8000 --user root --pass root --ns test --db test ./database/insert.surql

