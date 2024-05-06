import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoVentaComponent } from './historico-venta.component';

describe('HistoricoVentaComponent', () => {
  let component: HistoricoVentaComponent;
  let fixture: ComponentFixture<HistoricoVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoVentaComponent]
    });
    fixture = TestBed.createComponent(HistoricoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
