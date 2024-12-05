import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAchatComponent } from './edit-achat.component';

describe('EditAchatComponent', () => {
  let component: EditAchatComponent;
  let fixture: ComponentFixture<EditAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
