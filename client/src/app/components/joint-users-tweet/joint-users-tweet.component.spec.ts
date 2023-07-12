import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointUsersTweetComponent } from './joint-users-tweet.component';

describe('JointUsersTweetComponent', () => {
  let component: JointUsersTweetComponent;
  let fixture: ComponentFixture<JointUsersTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointUsersTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointUsersTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
