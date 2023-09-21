import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiexplorerComponent } from './apiexplorer.component';

describe('ApiexplorerComponent', () => {
  let component: ApiexplorerComponent;
  let fixture: ComponentFixture<ApiexplorerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiexplorerComponent]
    });
    fixture = TestBed.createComponent(ApiexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
