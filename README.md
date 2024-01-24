# Cryptamine

A full-stack application encompassing authentication and authorization. The implementation utilizes JWT technology for secure authentication and bcrypt for effective hashing of user passwords. All users are stored in MySQL database.

## Installation
Clone this repo: https://github.com/GabrielaGodek/EasyMail.git.
1. Open XAMPP and run Apache Web Server and MySQL Database.
2. Open an type in the browser localhost/phpmyadmin.
3. Upload auth.sql from backend/db folder.

## Routing
- `/` welcome view
- `/login` login form
- `/register` register form
- `/profile` page available only for authenticate users 

## Technologies
### Frontend
- Vite: `^5.0.8`
- Vue3: `^3.3.11`
- Vue Router: `^4.2.5`
- TypeScript: `^5.2.2`
- vue-password-strength-meter: `^1.7.2`

### Backend
- Node.js: `10.9.2`
- Express: `^4.18.2`,
- TypeScript: `^5.3.3`
- Bcrypt: `^5.1.1`,
- Cors: `^2.8.5`,
- Crypto: `^1.0.1`,
- Dotenv: `^16.3.2`,
- Jsonwebtoken: `^9.0.2`,
- Mysql2: `^3.7.`