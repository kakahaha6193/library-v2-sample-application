import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PhongdocsachService } from '../service/phongdocsach.service';

import { PhongdocsachComponent } from './phongdocsach.component';

describe('Phongdocsach Management Component', () => {
  let comp: PhongdocsachComponent;
  let fixture: ComponentFixture<PhongdocsachComponent>;
  let service: PhongdocsachService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PhongdocsachComponent],
    })
      .overrideTemplate(PhongdocsachComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhongdocsachComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PhongdocsachService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.phongdocsaches?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
