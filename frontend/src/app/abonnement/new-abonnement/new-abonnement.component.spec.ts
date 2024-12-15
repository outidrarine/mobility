import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAbonnementComponent } from './new-abonnement.component';

describe('NewAbonnementComponent', () => {
  let component: NewAbonnementComponent;
  let fixture: ComponentFixture<NewAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAbonnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
