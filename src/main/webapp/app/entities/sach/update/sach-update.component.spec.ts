jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SachService } from '../service/sach.service';
import { ISach, Sach } from '../sach.model';
import { INhaxuatban } from 'app/entities/nhaxuatban/nhaxuatban.model';
import { NhaxuatbanService } from 'app/entities/nhaxuatban/service/nhaxuatban.service';

import { SachUpdateComponent } from './sach-update.component';

describe('Sach Management Update Component', () => {
  let comp: SachUpdateComponent;
  let fixture: ComponentFixture<SachUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sachService: SachService;
  let nhaxuatbanService: NhaxuatbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SachUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SachUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SachUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sachService = TestBed.inject(SachService);
    nhaxuatbanService = TestBed.inject(NhaxuatbanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call nhaxuatban query and add missing value', () => {
      const sach: ISach = { id: 456 };
      const nhaxuatban: INhaxuatban = { id: 97333 };
      sach.nhaxuatban = nhaxuatban;

      const nhaxuatbanCollection: INhaxuatban[] = [{ id: 53800 }];
      jest.spyOn(nhaxuatbanService, 'query').mockReturnValue(of(new HttpResponse({ body: nhaxuatbanCollection })));
      const expectedCollection: INhaxuatban[] = [nhaxuatban, ...nhaxuatbanCollection];
      jest.spyOn(nhaxuatbanService, 'addNhaxuatbanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sach });
      comp.ngOnInit();

      expect(nhaxuatbanService.query).toHaveBeenCalled();
      expect(nhaxuatbanService.addNhaxuatbanToCollectionIfMissing).toHaveBeenCalledWith(nhaxuatbanCollection, nhaxuatban);
      expect(comp.nhaxuatbansCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sach: ISach = { id: 456 };
      const nhaxuatban: INhaxuatban = { id: 49357 };
      sach.nhaxuatban = nhaxuatban;

      activatedRoute.data = of({ sach });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(sach));
      expect(comp.nhaxuatbansCollection).toContain(nhaxuatban);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Sach>>();
      const sach = { id: 123 };
      jest.spyOn(sachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sach }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(sachService.update).toHaveBeenCalledWith(sach);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Sach>>();
      const sach = new Sach();
      jest.spyOn(sachService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sach }));
      saveSubject.complete();

      // THEN
      expect(sachService.create).toHaveBeenCalledWith(sach);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Sach>>();
      const sach = { id: 123 };
      jest.spyOn(sachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sachService.update).toHaveBeenCalledWith(sach);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackNhaxuatbanById', () => {
      it('Should return tracked Nhaxuatban primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackNhaxuatbanById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
