DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    img VARCHAR(255) NULL,
    route VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles (
    name,
    route,
    created_at,
    updated_at
)
VALUES(
    'USUARIO',
    'user',
    '2022-07-10',
    '2022-07-10'
);
INSERT INTO roles (
    name,
    route,
    created_at,
    updated_at
)
VALUES(
    'ADMIN',
    'admin',
    '2022-07-10',
    '2022-07-10'
);

DROP TABLE IF EXISTS users CASCADE;
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

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
    id_user BIGSERIAL NOT NULL,
    id_rol BIGSERIAL NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)    
);


-- =========================================

DROP TABLE IF EXISTS parking1_sensors CASCADE;
CREATE TABLE parking1_sensors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    lag_place VARCHAR(255) NOT NULL UNIQUE,
    log_place VARCHAR(255) NOT NULL UNIQUE,
    type_place VARCHAR(100) NOT NULL,
    plate VARCHAR(100) NOT NULL,
    code VARCHAR(255) NOT NULL,
    available BOOLEAN NOT NULL,
    description VARCHAR(255) NULL,
    created_s TIMESTAMP(0) NOT NULL,
    updated_s TIMESTAMP(0) NOT NULL
); 


DROP TABLE IF EXISTS parqueaderos CASCADE;
CREATE TABLE parqueaderos(
    id_user BIGSERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    cantidad VARCHAR(255) NOT NULL,
    -- plazas_libres VARCHAR(255) NOT NULL,
    -- plazas_ocupadas VARCHAR(255) NOT NULL,
    -- lag_place VARCHAR(255) NOT NULL UNIQUE,
    -- log_place VARCHAR(255) NOT NULL UNIQUE,
    -- description VARCHAR(255) NULL,
    -- created_at TIMESTAMP(0) NOT NULL,
    -- updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(cantidad) REFERENCES ( SELECT 
COUNT(*)
    FROM
        parking1_sensors
    WHERE 
        available = true) ON UPDATE CASCADE ON DELETE CASCADE,

    PRIMARY KEY(cantidad)    
);

INSERT INTO parqueaderos (
    name
)
VALUES(
    'Parqueadero 1'
);
-- CREATE TABLE parking_place(
--     id BIGSERIAL PRIMARY KEY,
--     name_place VARCHAR(255) NOT NULL,
--     description_place VARCHAR(255) NULL,
--     u_user_plate VARCHAR(50) NULL UNIQUE,
--     u_user_name VARCHAR(80) NULL,
--     u_user_phone VARCHAR(80) NOT NULL UNIQUE,
--     u_user_img VARCHAR(80) NULL,
--     is_available BOOLEAN NULL,
--     session_token VARCHAR (255) NULL,
--     place_Lat VARCHAR(255) NULL NULL UNIQUE,
--     place_Log VARCHAR(255) NULL NULL UNIQUE,
--     parking_Lot VARCHAR(255) NOT NULL
-- ); 

CREATE TABLE parking1_sensors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    lag_place VARCHAR(255) NOT NULL UNIQUE,
    log_place VARCHAR(255) NOT NULL UNIQUE,
    type_place VARCHAR(100) NOT NULL,
    plate VARCHAR(100) NOT NULL,
    code VARCHAR(255) NOT NULL,
    available BOOLEAN NOT NULL,
    description VARCHAR(255) NULL,
    created_s TIMESTAMP(0) NOT NULL,
    updated_s TIMESTAMP(0) NOT NULL
); 
