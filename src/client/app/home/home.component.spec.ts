import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { SubComponent } from './subcomponent.component';
import { NameListService } from '../shared/name-list/name-list.service';

class SpecService {
  queryAttributes(fixture: ComponentFixture<any>, cssSelector: string): any {
    fixture.detectChanges();

    let debugElement = fixture.debugElement.query(By.css(cssSelector));
    let attributes: any = {};
    if (debugElement) {
      for (let i = 0, length = debugElement.nativeElement.attributes.length; i < length; i++) {
        attributes[debugElement.nativeElement.attributes[i].name] =
          debugElement.nativeElement.attributes[i].value;
      }
    }
    return attributes;
  }
}

const specServ = new SpecService();

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent, SubComponent],
        providers: [
          { provide: NameListService, useValue: new MockNameListService() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockNameListService =
              fixture.debugElement.injector.get<any>(NameListService) as MockNameListService;
            let nameListServiceSpy = spyOn(mockNameListService, 'get').and.callThrough();

            mockNameListService.returnValue = ['1', '2', '3'];

            fixture.detectChanges();

            expect(homeInstance.nameListService).toEqual(jasmine.any(MockNameListService));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
            expect(nameListServiceSpy.calls.count()).toBe(1);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));

    it('should contain the ng-reflect attibute', async(() => {
      TestBed.compileComponents()
      .then(() => {
        let fixture = TestBed.createComponent(HomeComponent);
        let homeInstance = fixture.debugElement.componentInstance;

        let attributes = specServ.queryAttributes(fixture, 'sub-component');

        console.log('THE ATTRIBUTES ARE', attributes);

        expect(attributes['ng-reflect-first']).toBe('heya vizunah');
      });
    }));
  });
}

class MockNameListService {

  returnValue: string[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
