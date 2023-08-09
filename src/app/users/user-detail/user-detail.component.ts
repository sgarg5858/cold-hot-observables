import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent  implements OnInit{

  activatedRoute = inject(ActivatedRoute);
  userService= inject(UserService);
  router = inject(Router);
  user$:Observable<User|undefined>|undefined;
  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params)=>{
        if(params.has('id') && params.get('id')){
        const id = +params.get('id')!;
         this.user$ = this.userService.getUser(id);
        }
     })
  }

  closePreview()
  {
    this.router.navigate(['users'])
  }
}
