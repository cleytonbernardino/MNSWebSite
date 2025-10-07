import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';

const apiUrl = `${environment.apiUrl}/admin/company`;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient);

  getCompanies(): Observable<ResponseCompanies> {
    return this.http.get<ResponseCompanies>(apiUrl);
  }

  getCompany(id: string): Observable<ResponseCompany>{
    const url: string  = `${environment.apiUrl}/company/${id}`;
    return this.http.get<ResponseCompany>(url)
  }

  register(request: RequestRegisterCompany): Observable<void> {
    return this.http.post<void>(apiUrl, request);
  }

  update(id:string, request: RequestRegisterCompany): Observable<void> {
    const url: string = `${apiUrl}/${id}`
    return this.http.put<void>(url, request);
  }

  delete(companyId: string) {
    return this.http.delete(`${apiUrl}/${companyId}`);
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
