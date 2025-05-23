import { createToken, getAuthSecret, type AuthSecret } from '@lib/jwt';
import type { Token } from '../../types/auth';
import { queryGetAccoutByEmail } from './database';

// src/modules/auth/controller.ts
export async function loginController(context: any) {
  const body = await context.req.json();
  console.log("🚀 ~ body:", body)
  const { username, password } = body;
  
  const account = await queryGetAccoutByEmail(username);
  if (!account.clave) {
    return context.json({ success: false, message: 'Correo invalido' }, 401);
  }
  
  const { id, nombre: name } = account;
  
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
  };
  
  const secret: AuthSecret = getAuthSecret(Bun.env.ACCESS_TOKEN || '');
  const token: string = await createToken(payload, secret);
  
  return context.json({ accessToken: token }, 200);
}


export async function createController(c: any) {
  // Validar datos de entrada con Zod
  const body = await c.req.json();
  // const schema = z.object({
  //   email: z.string().email(),
  //   password: z.string().min(8),
  //   name: z.string().min(1),
  // });

  // const parse = schema.safeParse(body);

  // if (!parse.success) {
  //   return c.json(
  //     { error: 'Datos inválidos', details: parse.error.format() },
  //     400
  //   );
  // }

  const { username, password, name } = body;

  // Simula guardado en base de datos (aquí deberías hashear el password y guardar el usuario)
  const user = {
    username,
    name,
    password: password,
  };

  const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 300;
  // Payload para el token
  const payload = {
    id: 1,
    exp: expirationTime,
    samesite:'none',
    name: user.name,
    username: user.username,
  };

  // Clave secreta desde variable de entorno
  const rawSecret = Bun.env.AUTH_SECRET;
  if (!rawSecret) {
    return c.json(
      { error: 'Servidor sin clave de autenticación configurada' },
      500
    );
  }

  const authSecret = getAuthSecret(rawSecret);
  const token = await createToken(payload, authSecret);

  return c.json({
    message: 'Cuenta creada correctamente',
    user,
    token,
  });
}