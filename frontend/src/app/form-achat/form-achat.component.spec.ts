import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAchatComponent } from './form-achat.component';

describe('FormAchatComponent', () => {
  let component: FormAchatComponent;
  let fixture: ComponentFixture<FormAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
