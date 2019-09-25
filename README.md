# Node-Api-Jwt
Exemplo de api em NodeJs

API Rest em Node.js que implementa autenticação JWT. Possui um endpoint /token que retorna um token gerado a partir de 
credenciais enviadas no body da requisição. Não há integração com banco de dados, o endpoint retorna erro de autenticação para 
todas as requisições que não enviam o usuário “Numenu” e senha “123123” no body.

Extenções utilizadas:
- bcryptjs
- body-parser
- express
- jsonwebtoken
- nodemon
