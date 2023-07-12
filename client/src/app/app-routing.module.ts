import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavsComponent } from './components/favs/favs.component';
import { HomeComponent } from './components/home/home.component';
import { JointTweetComponent } from './components/joint-tweet/joint-tweet.component';
import { JointUsersTweetComponent } from './components/joint-users-tweet/joint-users-tweet.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { TwitterMentsComponent } from './components/twitter-ments/twitter-ments.component';
import { TwitterTimelineComponent } from './components/twitter-timeline/twitter-timeline.component';

const routes: Routes = [
  {path:'twitter_timeline', component: TwitterTimelineComponent},
  {path:'twitter_mentions', component: TwitterMentsComponent},
  {path:'tweets', component: TweetComponent},
  {path: 'liked_tweets', component: FavsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'joint_tweet', component: JointTweetComponent},
  {path: 'joint_custom', component: JointUsersTweetComponent},


  {path:'**', redirectTo: 'home', pathMatch: 'full' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
