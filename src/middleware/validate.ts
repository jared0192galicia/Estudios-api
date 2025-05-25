import { getAuthSecret, verify } from '@lib/jwt';

/**
 * Middleware para proteger las rutas de la aplicación
 * a través de una area y un nivel de rol
 * @param params params
 * @returns
 */
export const protect =
  () =>
  async (context: any, next: any): Promise<any> => {
    const authHeader: string = context.req.header('authorization');
    let token: string = authHeader && authHeader.split(' ')[1];

    // No tiene token o no tiene permiso
    if (!token) return context.json({ messages: 'Sin token de acceso' }, 401);

    try {
      const secret = getAuthSecret(Bun.env.ACCESS_TOKEN || '');
      const verified = await verify(token, secret);

      // Token no valido
      if (!verified)
        return context.json({ messages: 'Token de acceso invalido' }, 401);

      await next();
    } catch (error) {
      console.log(error);
      context.json({ messages: 'Error interno del servidor' }, 500);
    }
  };
