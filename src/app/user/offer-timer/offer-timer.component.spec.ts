/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfferTimerComponent } from './offer-timer.component';
import { MenuComponent } from '../menu/menu.component';
import { HttpClientModule } from '@angular/common/http';

describe('OfferTimerComponent', () => {
  let component: OfferTimerComponent;
  let fixture: ComponentFixture<OfferTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTimerComponent, MenuComponent ],
      imports:[HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
