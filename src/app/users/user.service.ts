import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getUsers()
  {
    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      catchError(()=>of([]))
    );
  }
  getUser(id:number)
  {
    return this.getUsers().pipe(
      map((users:User[])=>users.find((user)=>user.id===id)),
      catchError(()=>of(undefined))
    );
  }
}
