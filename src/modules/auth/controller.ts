import { createToken, getAuthSecret, type AuthSecret } from '@lib/jwt';
import type { Token } from '../../types/auth';
import { queryGetAccoutByEmail } from './database';

// src/modules/auth/controller.ts
export async function loginController(context: any) {
  const body = await context.req.json();
  const { username, password } = body;

  const account = await queryGetAccoutByEmail(username);
  if (!account.clave) {
    return context.json({ success: false, message: 'Correo invalido' }, 401);
  }

  const { id, idNivelAcceso: levelAccess, nombre: name } = account;

  const passwordMatch = await Bun.password.verify(account.clave, password);

  if (!passwordMatch)
    return context.json({ message: 'Contraseña invalida' }, 401);

  const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 300;

  const payload: Token = {
    id,
    exp: expirationTime,
    samesite: 'none',
    username,
    name: name || '',
    levelAccess: levelAccess || 0,
  };

  const secret: AuthSecret = getAuthSecret(Bun.env.ACCESS_TOKEN || '');
  const token: string = await createToken(payload, secret);

  return context.json({ accessToken: token }, 200);
}
