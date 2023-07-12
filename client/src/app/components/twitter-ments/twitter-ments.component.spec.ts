import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterMentsComponent } from './twitter-ments.component';

describe('TwitterMentsComponent', () => {
  let component: TwitterMentsComponent;
  let fixture: ComponentFixture<TwitterMentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterMentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterMentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
