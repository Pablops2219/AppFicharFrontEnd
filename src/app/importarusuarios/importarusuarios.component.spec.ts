import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarusuariosComponent } from './importarusuarios.component';

describe('ImportarusuariosComponent', () => {
  let component: ImportarusuariosComponent;
  let fixture: ComponentFixture<ImportarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportarusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
