import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, NEVER, Observable, switchMap, tap, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private router = inject(Router);

  private isRefreshingSignal = signal(false);
  private accessTokenSignal = signal<string | null>(
    this.getAccessToken()
  );

  readonly accessToken = computed(() => this.accessTokenSignal());
  readonly isRefreshing = computed(() => this.isRefreshingSignal());
  readonly  isAuthenticated = computed(() => !!this.accessTokenSignal());

  setAccessToken(token: string): void{
    localStorage.setItem(environment.access_token_key!, token)
    this.accessTokenSignal.set(token);
  }

  getAccessToken(): string|null {
    if (typeof window !== 'undefined')
      return localStorage.getItem(environment.access_token_key);
    return null;
  }

  clearAccessToken(): void{
    localStorage.removeItem(environment.access_token_key!);
    this.accessTokenSignal.set(null);
  }

  login(credentials: { email: string; password: string }): Observable<ResponseLogin | null> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true
    })
      .pipe(
        tap(response => this.setAccessToken(response.tokens.accessToken)),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<void> {
    const request = {accessToken: this.getAccessToken()}
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, request, {
      withCredentials: true
    }).pipe(
      catchError(() => NEVER),
      tap(() => {
        this.clearAccessToken();
      })
    );
  }

  refreshToken(): Observable<string>{
    if (this.isRefreshingSignal()){
      return new Observable<string>((subscriber => {
        const stoped = effect(() => {
          if (!this.isRefreshingSignal() && this.accessTokenSignal()){
            subscriber.next(this.accessTokenSignal()!);
            subscriber.complete();
            stop();
        }
        })
      }))
    }

    this.isRefreshingSignal.set(true);

    return this.http.post<Token>(`${this.apiUrl}/auth/refresh`, {}, {
      withCredentials: true
    }).pipe(
      switchMap((response) => {
        const newToken = response.accessToken;
        this.setAccessToken(newToken);
        this.isRefreshingSignal.set(false);
        return [newToken];
      }),
      catchError((error: HttpErrorResponse) => {
        this.isRefreshingSignal.set(false);
        this.clearAccessToken();
        this.handleAuthError();
        return throwError(() => error);
      })
    );
  }
  private handleAuthError(): void {
    this.router.navigateByUrl('/login');
  }
}
