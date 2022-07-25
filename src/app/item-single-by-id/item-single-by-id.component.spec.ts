import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSingleByIdComponent } from './item-single-by-id.component';

describe('ItemSingleByIdComponent', () => {
  let component: ItemSingleByIdComponent;
  let fixture: ComponentFixture<ItemSingleByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSingleByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSingleByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
