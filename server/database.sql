CREATE DATABASE perntodo;
CREATE TYPE status AS ENUM ('incomplete', 'complete');


CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    todo_status status NOT NULL DEFAULT 'incomplete'
)