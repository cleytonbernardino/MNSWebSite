import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelAdmin } from './control-panel-admin';

describe('ControlPanelAdmin', () => {
  let component: ControlPanelAdmin;
  let fixture: ComponentFixture<ControlPanelAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlPanelAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPanelAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
