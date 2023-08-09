import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, catchError, map, of, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  users$:Observable<User[]>|undefined;

  getUsers()
  {
    if(!this.users$)
    {
      //Here we are caching the observable, but this will not work as 
      // each time subscribe is called on this observable it will make http call
      //as observables are unicast
      this.users$= this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
        share(),
        catchError(()=>of([]))
      );
    }
    return this.users$;
  }
  getUser(id:number)
  {
    return this.getUsers().pipe(
      map((users:User[])=>users.find((user)=>user.id===id)),
      catchError(()=>of(undefined))
    );
  }
}
