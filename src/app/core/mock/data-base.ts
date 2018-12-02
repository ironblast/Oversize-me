import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ResponseOptions } from '@angular/http';

export class DataService implements InMemoryDbService {
  createDb() {
    const todos = [
      {
        id: 1,
        state: true,
        title: `S'occuper des enfants`,
        description: `Pas d'Ipad...`
      },
      {
        id: 2,
        state: true,
        title: `Passer l'aspirateur`,
        description: 'sans oublier de passer sous les meubles'
      },
      {
        id: 3,
        state: false,
        title: 'Faire du sport',
        description: `Si il pleut pas...Il pleut...`
      }
    ];
    return { todos };
  }

  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
    console.log('[Requete]', reqInfo);
    console.log('[Reponse]', resOptions);
    return resOptions;
  }
}