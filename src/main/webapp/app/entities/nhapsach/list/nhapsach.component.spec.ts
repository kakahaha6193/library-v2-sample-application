jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NhapsachService } from '../service/nhapsach.service';

import { NhapsachComponent } from './nhapsach.component';

describe('Nhapsach Management Component', () => {
  let comp: NhapsachComponent;
  let fixture: ComponentFixture<NhapsachComponent>;
  let service: NhapsachService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NhapsachComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } },
        },
      ],
    })
      .overrideTemplate(NhapsachComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NhapsachComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NhapsachService);

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
    expect(comp.nhapsaches?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
