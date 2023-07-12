import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwitterTimelineComponent } from './components/twitter-timeline/twitter-timeline.component';
import { TwitterMentsComponent } from './components/twitter-ments/twitter-ments.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card'
import { MatFormFieldModule} from '@angular/material/form-field'
import {MatInput, MatInputModule} from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavsComponent } from './components/favs/favs.component';
import { HomeComponent } from './components/home/home.component';
import { JointTweetComponent } from './components/joint-tweet/joint-tweet.component';
import { JointUsersTweetComponent } from './components/joint-users-tweet/joint-users-tweet.component';


@NgModule({
  declarations: [
    AppComponent,
    TwitterTimelineComponent,
    TwitterMentsComponent,
    TweetComponent,
    FavsComponent,
    HomeComponent,
    JointTweetComponent,
    JointUsersTweetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
