import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFacturaComponent } from './historico-factura.component';

describe('HistoricoFacturaComponent', () => {
  let component: HistoricoFacturaComponent;
  let fixture: ComponentFixture<HistoricoFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoFacturaComponent]
    });
    fixture = TestBed.createComponent(HistoricoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
