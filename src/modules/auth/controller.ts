// src/modules/auth/controller.ts
export async function loginController(context: any) {
  const body = await context.req.json();
  const { email, password } = body;

  // lógica falsa solo para ejemplo
  if (email === 'test@example.com' && password === '1234') {
    return context.json({ success: true, token: 'abc123' });
  }

  return context.json({ success: false, message: 'Invalid credentials' }, 401);
}
