import type { MiddlewareHandler } from 'hono';
import packageJSON from '../../package.json';
const about = {
  authors:
    'Yael Alberto Gómez Hernández, Elietzer Jared Galicia Cordova, Elio Justino Cruz Ortega.',
  version: packageJSON.version,
  organization: 'Universidad de la Sierra Sur.',
};

function serveAbout(): MiddlewareHandler {
  return async (context, next) => {
    if (context.req.path === '/') {
      try {
        return context.json(about);
      } catch (error) {
        console.log(error);
        return context.text('about not found', 404);
      }
    }
    return next();
  };
}

export default serveAbout;
