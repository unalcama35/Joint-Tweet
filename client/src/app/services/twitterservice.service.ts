import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TwitterserviceService {


  api_url = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getTimeline(){
    return this.http
    .get<any[]>(this.api_url+'/home_timeline')
    .pipe(map(data => data));
  }

  getMents(){
    return this.http
    .get<any[]>(this.api_url+'/mentions_timeline')
    .pipe(map(data => data))
  }
  getUserTweets(){
    return this.http
    .get<any[]>(this.api_url+'/user_timeline')
    .pipe(map(data => data))
  }

  getFavs(){

    return this.http
    .get<any[]>(this.api_url+'/liked_tweets', {headers: new HttpHeaders})
    .pipe(map(data => data))
  }
  
 tweet(tweetdata: string) {
         console.log(tweetdata)


         let headers = new HttpHeaders()
         headers = headers.append("Content-Type", "application/json")

        return this.http.post<any>(this.api_url+'/post_tweet/', { status: tweetdata},  {headers:headers})
            .pipe(map(tweet => {
             
                console.log("tweet posted")
 
                return tweet;
            }));
    }

   sendHandle(userHandle: string){


    let headers = new HttpHeaders()
    headers = headers.append("Content-Type", "application/json")

   return this.http.post<any>(this.api_url+'/send_handle/', {userHandle: userHandle},  {headers:headers})
       .pipe(map(data => {
           console.log("SENDHANDLE EXECUTED: " + data)

           return data;
       }));
  
}


  getID(){
  
  
 return  this.http
  .get<any>(this.api_url+'/get_ID')
  .pipe(map(data => data))
}

getHandle(){
  
  
  return  this.http
   .get<any>(this.api_url+'/get_handle')
   .pipe(map(data => data))
 }



sendID(userID: string){


  let headers = new HttpHeaders()
  headers = headers.append("Content-Type", "application/json")
  
 return this.http.post<any>(this.api_url+'/send_ID/', {userID: userID},  {headers:headers})
     .pipe(map(data => {
          
         console.log("ID sent")

         return data;
     }));

}


sendJointHandle(username: string){


  let headers = new HttpHeaders()
  headers = headers.append("Content-Type", "application/json")
  
 return this.http.post<any>(this.api_url+'/send_joint_handle', {username: username},  {headers:headers})
     .pipe(map(data => {
          
         console.log("joint handle sent")

         return data;
     }));

}

signIn(){

  console.log("signin clicked")

  let headers = new HttpHeaders()
  
 return this.http.post<any>(this.api_url+'/sign_in',{data:"http://localhost:4200/"},  {headers:headers}) //redirect to localhost
     .pipe(map(data => {
          
         console.log(data)

         return data;
     }));

}

















}
