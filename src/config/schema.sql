
CREATE TABLE cuenta (
 id SERIAL PRIMARY KEY,
 nombre VARCHAR(255),
 usuario VARCHAR(255) UNIQUE,
 clave VARCHAR(255)
);

MODE=development
POSTGRE_URL=postgres://postgres:DMR003QP10@localhost:5432/enfermeria
ACCESS_TOKEN=0196ff4b-405d-7000-99d0-16d7ddfed589