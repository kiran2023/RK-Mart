/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { CartComponent } from './cart.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';
import { NGXLogger } from 'ngx-logger';
import { RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent, MenuComponent ],
      imports:[HttpClientModule, RouterLinkActive, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [CartComponent],
    providers: [
      {
        provide: NGXLogger,
        useValue: {
          // Create a mock of NGXLogger if needed
        },
      },
    ],
  }).compileComponents();
});