CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number BIGINT,
    address VARCHAR(255),
    gender VARCHAR(255),
    role VARCHAR(255),
    services TEXT[], -- Assuming services is an array of text
    coordinates_lat DOUBLE PRECISION,
    coordinates_lng DOUBLE PRECISION
);
