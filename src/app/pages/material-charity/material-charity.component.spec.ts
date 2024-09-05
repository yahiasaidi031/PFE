import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCharityComponent } from './material-charity.component';

describe('MaterialCharityComponent', () => {
  let component: MaterialCharityComponent;
  let fixture: ComponentFixture<MaterialCharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialCharityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
