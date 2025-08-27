# nodejs-utils

Проект для утилит на NodeJS

## Запросы

curl -X POST "http://localhost:3000/create" \
     -H "Content-Type: application/json" \
     -d '{
           "firstName": "Иван",
           "lastName": "Петров",
           "score": 85
         }'

curl -X POST "http://localhost:3000/add-score/:id" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Witcher 3",
           "score": 85
         }'

curl -X POST "http://localhost:3000/get-scores" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Witcher 3"
         }'