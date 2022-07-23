import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const swaggerDef = require('../../../swaggerDef');

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  /**
   * @description Forwards any requests to the / URI to our Router
   * @constructs
   */
  app.get('/', (_req, res) => {
    res.json({ msg: 'hello' });
  });

  /**
   * @description
   *  If swagger.json file exists in root folder, shows swagger api description
   *  else send commands, how to get swagger.json file
   * @constructs
   */
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, '../../src/**/**/*.ts')],
      }),
    ),
  );

  /**
   * @description No results returned mean the object is not found
   * @constructs
   */
  app.use((_req, res) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);
}
