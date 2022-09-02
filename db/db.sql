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
    msg VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    parqueadero VARCHAR(50) NOT NULL,
    plaza VARCHAR(50) NOT NULL,
    available BOOLEAN NOT NULL,
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
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    -- cantidad VARCHAR(255) NOT NULL,
    -- plazas_libres VARCHAR(255) NOT NULL,
    -- plazas_ocupadas VARCHAR(255) NOT NULL,
    -- lag_place VARCHAR(255) NOT NULL UNIQUE,
    -- log_place VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NULL,
    created_ps TIMESTAMP(0) NOT NULL,
    updated_ps TIMESTAMP(0) NOT NULL   
);

DROP TABLE IF EXISTS sensors CASCADE;
CREATE TABLE sensors(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    lag_s VARCHAR(255) NULL UNIQUE,
    log_s VARCHAR(255) NULL UNIQUE,
    type_place VARCHAR(100) NOT NULL,
    plate VARCHAR(100) NOT NULL,
    code VARCHAR(255) NULL,
    available BOOLEAN NOT NULL,
    description VARCHAR(255) NULL,
    id_parking BIGINT NOT NULL,
    created_srs TIMESTAMP(0) NOT NULL,
    updated_srs TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (id_parking) REFERENCES parqueaderos(id) ON UPDATE CASCADE ON DELETE CASCADE

);


-- INSERT INTO parqueaderos (
--     name
-- )
-- VALUES(
--     'Parqueadero 1'
-- );
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

CREATE TABLE mensajes (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255) NULL,
    created_s TIMESTAMP(0) NOT NULL
); 


-- ===================================
SELECT
	P.id,
	P.name,
	P.lag_s,
	P.log_s,
	P.type_place,
	P.plate,
	P.code,
	P.available,
	P.description,
	P.id_parking
FROM
	sensors AS P
INNER JOIN
	parqueaderos AS C
ON 
	P.id_parking = C.id
WHERE
	C.id = 1






