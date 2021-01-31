/* eslint-disable linebreak-style */
import db from '../../db.json';

export default function dbHandler(request, response) {
  // Snippet de código que configura a resposta para se conseguir fazer uma api pública
  // possibilitando qualquer um de acessá-la. Evitando o erro de Cors - Cross Origin...
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  // Fim Snippet...

  response.json(db);
}
