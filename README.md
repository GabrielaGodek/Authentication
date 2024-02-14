# Cryptamine

A full-stack application encompassing authentication and authorization. The implementation utilizes JWT technology for secure authentication and bcrypt for effective hashing of user passwords. All users are stored in MySQL database.

## Installation
1. Clone this repo: https://github.com/GabrielaGodek/Cryptamine.git.
2. Open XAMPP and run Apache Web Server and MySQL Database.
3. Open and type in the browser: localhost/phpmyadmin.
4. Upload `users.sql` from _backend/db_ folder.
5. At the root folder in terminal run `docker-compose up --build`

This database contain few fake users and admins, but feel free to register and add your account to database!

## Routing
- `/` welcome view
- `/login` login form
- `/register` register form
- `/profile` page available only for authenticate users 

### Available options for _profile view_
- As an user: edit your account, change username, email or password.
- As an admin: manage users list by deleting user. <br>

Log in as an one of _users_
```js
email: cate@cate.com 
password: demo
```
Log in as an _admin_
```js
email: admin@admin.com 
password: demo
```

## Security
### Hashing
Password hashing is implemented using `bcrypt`. Additionally, a `jwt` token is generated during the login/register process. Without this token, access to the profile view is unavailable.

### SQL Injection
To prevent SQL Injection attacks the `execute` method is used instead of `query` to interact with the MySQL database. 
The execute method automatically employs prepared statements, which involve using placeholders (?) for variable values in SQL queries. When using placeholders, actual values are passed separately in an array as the second parameter of the function. This approach ensures that user input is properly sanitized and escaped.

### Input validation on BE and FE end
Input validation on both the front-end and back-end is crucial because it serves as a two-tiered defense against erroneous or malicious data. On the front-end, validation _ensures a seamless user experience_ by catching and preventing basic errors before the data is even submitted. This not only enhances user satisfaction but also _reduces the likelihood of unnecessary server requests, optimizing performance_.
On the back-end, _validation is essential for security and data integrity_. It acts as a robust barrier against potential threats such as injection attacks or the submission of harmful data.


<!-- ### Cross-site request forgery
To mitigate CSRF attacks, middleware has been implemented on the Express.js server. This middleware helps protect against unauthorized cross-site requests, enhancing the overall security of the application. Additionally, it is crucial to incorporate CSRF tokens into the application's forms, ensuring an additional layer of defense against potential threats. -->

## Technologies
### Frontend
- Vite: `^5.0.8`
- Vue3: `^3.3.11`
- Vue Router: `^4.2.5`
- TypeScript: `^5.2.2`
- vue-password-strength-meter: `^1.7.2`

### Backend
- Node.js: `^10.9.2`
- Express: `^4.18.2`,
- TypeScript: `^5.3.3`
- Bcrypt: `^5.1.1`,
- Cors: `^2.8.5`,
- Crypto: `^1.0.1`,
- Dotenv: `^16.3.2`,
- Jsonwebtoken: `^9.0.2`,
- Mysql2: `^3.7.1`

## Preview
![Crypamine](frontend/public//cryptamine_preview.png)