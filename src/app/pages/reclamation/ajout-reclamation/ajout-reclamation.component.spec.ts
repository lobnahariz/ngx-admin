import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutReclamationComponent } from './ajout-reclamation.component';

describe('AjoutReclamationComponent', () => {
  let component: AjoutReclamationComponent;
  let fixture: ComponentFixture<AjoutReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
