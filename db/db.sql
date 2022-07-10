CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    plate VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    ci VARCHAR(80) NOT NULL UNIQUE,
    phone VARCHAR(80) NOT NULL UNIQUE,
    img VARCHAR(80) NULL,
    password VARCHAR(255) NOT NULL,
    plaza VARCHAR(50) NOT NULL,
    is_available BOOLEAN NULL,
    session_token VARCHAR (255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
); 

CREATE TABLE parking_place(
    id BIGSERIAL PRIMARY KEY,
    name_place VARCHAR(255) NOT NULL,
    description_place VARCHAR(255) NULL,
    u_user_plate VARCHAR(50) NULL UNIQUE,
    u_user_name VARCHAR(80) NULL,
    u_user_phone VARCHAR(80) NOT NULL UNIQUE,
    u_user_img VARCHAR(80) NULL,
    is_available BOOLEAN NULL,
    session_token VARCHAR (255) NULL,
    place_Lat VARCHAR(255) NULL NULL UNIQUE,
    place_Log VARCHAR(255) NULL NULL UNIQUE,
    parking_Lot VARCHAR(255) NOT NULL
); 


