import { createToken, getAuthSecret, verify, type AuthSecret } from '@lib/jwt';
import type { Token } from '@my-types/auth';
import { queryGetAccoutByEmail, queryInsertAccout } from './database';

// src/modules/auth/controller.ts
export async function loginController(context: any) {
  const body = await context.req.json();
  const { username, password } = body;

  const account: any = await queryGetAccoutByEmail(username);
  if (!account) {
    return context.json({ success: false, message: 'Correo invalido' }, 401);
  }

  const { id, nombre: name } = account;

  const passwordMatch = await Bun.password.verify(password, account.clave);

  if (!passwordMatch)
    return context.json({ message: 'Contraseña invalida' }, 401);

  const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 300;

  const payload: Token = {
    id,
    exp: expirationTime,
    samesite: 'none',
    username,
    name: name || '',
  };

  const secret: AuthSecret = getAuthSecret(Bun.env.ACCESS_TOKEN || '');
  const token: string = await createToken(payload, secret);

  return context.json({ accessToken: token }, 200);
}

export async function createController(c: any) {
  try {
    const body = await c.req.json();
    const { username, password, name } = body;

    if (!username || !password || !name)
      return c.json({ error: 'Faltan datos' }, 400);

    const existingUser = await queryGetAccoutByEmail(username);

    if (existingUser) return c.json({ error: 'El usuario ya existe' }, 400);

    const hash: string = await Bun.password.hash(password);

    const user = {
      usuario: username,
      nombre: name,
      clave: hash,
    };

    const { id } = await queryInsertAccout(user);

    const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 300;

    // Clave secreta desde variable de entorno
    const rawSecret = Bun.env.ACCESS_TOKEN;
    if (!rawSecret) {
      return c.json(
        { error: 'Servidor sin clave de autenticación configurada' },
        500
      );
    }

    // Payload para el token
    const payload = {
      id,
      exp: expirationTime,
      samesite: 'none',
      name: user.nombre,
      username: user.usuario,
    };

    const authSecret = getAuthSecret(rawSecret);

    const token = await createToken(payload, authSecret);

    return c.json({
      message: 'Cuenta creada correctamente',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
}

export async function auth(context: any) {
  try {
    const authHeader = context.req.header('authorization');

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return context.json({ message: 'no token' }, 401);

    const secret = getAuthSecret(Bun.env.ACCESS_TOKEN || '');
    const verified = await verify(token, secret);

    if (!verified) return context.json({ message: 'invalid token' }, 401);

    return context.json({ message: 'valid token' }, 200);
  } catch (error) {
    console.error('Error en el controlador de autenticación:', error);
    return context.json({ message: 'Error interno del servidor' }, 500);
  }
}
