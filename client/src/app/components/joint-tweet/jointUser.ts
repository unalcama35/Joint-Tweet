import { Fav } from "../favs/fav";


export class JointUser extends Fav{

    points:number;
    mentsCount:number;
    MENT_SCORE=4;
    FAV_SCORE=2
    screen_name:string;

    constructor(username:string, userID:string, pic:string, profile:string, tweetID:string, tweetDate:string, banner:string, initPts:boolean, screen_name:string) { 
        super(username, userID, pic, profile, tweetID, tweetDate, banner)
        if(initPts){
        this.points=this.FAV_SCORE}
        else{
            this.points=this.MENT_SCORE
        }
        this.mentsCount=0;
        this.screen_name=screen_name;
    }

    override incrementCount(tweetID:string, tweetDate:string):void{
        super.incrementCount(tweetID, tweetDate)
        this.calculateScore();
    }

    incrementMentsCount(tweetID:string, tweetDate:string):void{
        this.mentsCount++;
        this.calculateScore();

    }

    calculateScore(){
        this.points=(this.count*this.FAV_SCORE + this.mentsCount*this.MENT_SCORE)

    }

}