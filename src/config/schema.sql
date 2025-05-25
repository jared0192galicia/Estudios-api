CREATE TABLE cuenta (
 id SERIAL PRIMARY KEY,
 nombre VARCHAR(255),
 usuario VARCHAR(255) UNIQUE,
 clave VARCHAR(255)
);

CREATE TABLE "resultados_AD" (
 id serial PRIMARY KEY,
 matricula VARCHAR(255),
 "apPaterno" VARCHAR(255),
 "apMaterno" VARCHAR(255),
 nombres VARCHAR(255),
 edad INTEGER,
 sexo VARCHAR(100),
 fecha DATE,
 cocaina VARCHAR(100),
 anfetamina VARCHAR(100),
 metanfetamina VARCHAR(100),
 opioides VARCHAR(100),
 cannabis VARCHAR(100)
);