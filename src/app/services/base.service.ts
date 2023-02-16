import { LocalStorageUtils } from './../utils/localstorage';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {

  constructor() {}

  public LocalStorage = new LocalStorageUtils();

  protected UrlServiceV1: string = 'https://apirypecorp-production.up.railway.app';

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
      }),
    };
  }
  protected ObterAuthHeaderUploadJson() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
      }),
    };
  }

  protected extractData(response: any) {
    return response || {};
  }

  protected serviceError(response: Response | any) {

    let customError: string[] = [];
    let customResponse = { error: { errors: [] } };
    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um errro desconhecido');
        response.error.errors = customError;
      }
    }

    if (response.status === 0 || response.status == 500) {
      customError.push(
        'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.'
      );
      // Erros do tipo 500 não possuem uma lista de erros
      // A lista de erros do HttpErrorResponse é readonly
      response.error.errors = customError;
      return throwError(response);
    }

    if (response instanceof HttpErrorResponse) {
      customError.push(response.error.error);
      response.error.errors = customError;
    }

    return throwError(response);
  }
}
