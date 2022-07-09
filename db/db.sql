CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,--1 
    plate VARCHAR(50) NOT NULL UNIQUE,--2 ***
    name VARCHAR(255) NOT NULL,--3 ***
    email VARCHAR(255) NOT NULL UNIQUE,--4 ***
    ci VARCHAR(80) NOT NULL UNIQUE,--5 ***
    phone VARCHAR(80) NOT NULL UNIQUE,--6 ***
    img VARCHAR(80) NULL,--7 
    password VARCHAR(255) NOT NULL,--8 **
    plaza VARCHAR(50) NOT NULL,--9
    is_available BOOLEAN NULL,--10
    session_token VARCHAR (255) NULL,--11
    created_at TIMESTAMP(0) NOT NULL,-- 12 *
    updated_at TIMESTAMP(0) NOT NULL--13 *
); 