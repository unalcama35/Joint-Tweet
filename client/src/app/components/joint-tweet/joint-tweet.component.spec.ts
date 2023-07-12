import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointTweetComponent } from './joint-tweet.component';

describe('JointTweetComponent', () => {
  let component: JointTweetComponent;
  let fixture: ComponentFixture<JointTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
