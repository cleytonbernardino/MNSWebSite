import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, Observable, retry, throwError} from 'rxjs';
import {Companies} from '../pages/admin/companies/companies';

const apiUrl = `${environment.apiUrl}/admin/company`;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient);

  getCompanies(): Observable<ResponseCompany> {
    return this.http.get<ResponseCompany>(apiUrl);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Requisição inválida';
          break;
        case 401:
          errorMessage = 'Não autorizado';
          break;
        case 404:
          errorMessage = 'Empresas não encontradas';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        case 0:
          errorMessage = 'Erro de conexão. Verifique sua internet.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    console.error('Erro na API:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
