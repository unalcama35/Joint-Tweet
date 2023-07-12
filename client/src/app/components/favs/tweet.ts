export class Tweet{
    date:string;
    link:string;


    

    constructor(date:string, link:string) { 
        this.date=date.replace("+0000", "");;

        this.link=link;

    }


}

