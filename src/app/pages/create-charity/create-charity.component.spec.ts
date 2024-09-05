import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharityComponent } from './create-charity.component';

describe('CreateCharityComponent', () => {
  let component: CreateCharityComponent;
  let fixture: ComponentFixture<CreateCharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
