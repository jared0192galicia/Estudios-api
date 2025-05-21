# 🧩 API con Bun, TypeScript y Hono

Este proyecto es una API modular construida con [Bun](https://bun.sh/), [TypeScript](https://www.typescriptlang.org/) y [Hono](https://hono.dev/).

---

## 🚀 Tecnologías principales

- [Bun](https://bun.sh/) - Runtime ultrarrápido
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Hono](https://hono.dev/) - Framework web minimalista inspirado en Express
- [Zod](https://zod.dev/) (pendiente) - Validaciones de datos

---

## 📁 Estructura del proyecto

```bash
src/
├── index.ts            # Punto de entrada principal
├── modules/            # Módulos organizados por funcionalidad
│ └── auth/             # Modulo
│ ├── routes.ts         # Archivo de rutas
│ ├── controller.ts     # Archivo controlador
│ └── databases.ts      # Archivo de querys para la bd
├── config/             # Configuraciones del entorno, DB, etc.
├── lib/                # Middlewares, validaciones, helpers
└── types/              # Tipos globales de la aplicación

```
---

## 🛠️ Requisitos

- [Bun](https://bun.sh/docs/installation) (v1.1 o superior)

---

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clonehttps://github.com/jared0192galicia/Estudios-api.git
cd Estudios-api
```

### 2. Instalar dependencias

```bash
bun install
```

### 2. ▶️ Ejecutar en modo desarrollo

```bash
bun run src/index.ts
```

El servidor iniciara en http://localhost:3000
