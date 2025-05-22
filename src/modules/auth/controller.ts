// import type { Token } from '@types/auth';
import { queryGetAccoutByEmail } from './database';

// src/modules/auth/controller.ts
export async function loginController(context: any) {
  const body = await context.req.json();
  const { email, password } = body;

  const account = await queryGetAccoutByEmail(email);
  if (!account.clave) {
    return context.json(
      { success: false, message: 'Correo invalido' },
      401
    );
  }

  const { id, email: user, idNivelAcceso: levelAccess,  } = account;

  const passwordMatch = await Bun.password.verify(account.clave, password);
  
  // if (!passwordMatch)
  //   return context.json({message: 'Contraseña invalida'}, 401);

  // const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 300;

  // const payload: Token = {
  //   exp: expirationTime,
  //   samesite: 'none',
  //   id,
  //   user: user || '',
  //   email: email || '',
  //   name: name || '',
  //   levelAccess: levelAccess || 0,
  // };

  // const secret: AuthSecret = getAuthSecret(Bun.env.ACCESS_TOKEN);
  // const token: string = await createToken(payload, secret);

  // return context.json({ accessToken: token }, OK);


  return context.json({ success: true, token: 'abc123' });
}
