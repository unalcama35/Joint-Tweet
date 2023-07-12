import { Tweet } from "./tweet";

export class Fav{
    username:string;
    userID:string;
    count:number;
    pic:string;
    profile:string;
    tweets: Tweet[]=[];
    banner:string;

    

    constructor(username:string, userID:string, pic:string, profile:string, tweetID:string, tweetDate:string, banner:string) { 
        this.username=username;
        this.userID=userID;
        this.pic=pic;
        this.banner=banner;
        this.profile=profile;
        this.tweets.push(new Tweet(tweetDate,this.profile + '/status/' + tweetID))
        this.count=1;

    }



    incrementCount(tweetID:string, tweetDate:string):void{
        this.tweets.push(new Tweet(tweetDate,this.profile+'/status/'+tweetID))
        this.count++;
    }

}

