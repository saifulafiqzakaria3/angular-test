// import { HttpClient} from '@angular/common/http';
// import { Injectable } from '@angular/core';

// import { User } from '../model/user.model';


// @Injectable({providedIn: 'root'})
// export class DataStorageService {
//   constructor(private http: HttpClient) {}


//   storeUserInfo(user: User) {
//     //Put instead of Post because I want to override everytime I save
//     this.http
//       .put(
//         'https://angular-test-fourtitude-default-rtdb.firebaseio.com/user.json',
//         user
//       )
//       .subscribe((response) => {
//         console.log(response);
//       });
//   }
// }
