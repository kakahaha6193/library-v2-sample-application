jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CuonsachService } from '../service/cuonsach.service';
import { ICuonsach, Cuonsach } from '../cuonsach.model';
import { ISach } from 'app/entities/sach/sach.model';
import { SachService } from 'app/entities/sach/service/sach.service';

import { CuonsachUpdateComponent } from './cuonsach-update.component';

describe('Cuonsach Management Update Component', () => {
  let comp: CuonsachUpdateComponent;
  let fixture: ComponentFixture<CuonsachUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cuonsachService: CuonsachService;
  let sachService: SachService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CuonsachUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(CuonsachUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CuonsachUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cuonsachService = TestBed.inject(CuonsachService);
    sachService = TestBed.inject(SachService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call sach query and add missing value', () => {
      const cuonsach: ICuonsach = { id: 456 };
      const sach: ISach = { id: 3814 };
      cuonsach.sach = sach;

      const sachCollection: ISach[] = [{ id: 23049 }];
      jest.spyOn(sachService, 'query').mockReturnValue(of(new HttpResponse({ body: sachCollection })));
      const expectedCollection: ISach[] = [sach, ...sachCollection];
      jest.spyOn(sachService, 'addSachToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cuonsach });
      comp.ngOnInit();

      expect(sachService.query).toHaveBeenCalled();
      expect(sachService.addSachToCollectionIfMissing).toHaveBeenCalledWith(sachCollection, sach);
      expect(comp.sachesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cuonsach: ICuonsach = { id: 456 };
      const sach: ISach = { id: 65021 };
      cuonsach.sach = sach;

      activatedRoute.data = of({ cuonsach });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(cuonsach));
      expect(comp.sachesCollection).toContain(sach);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Cuonsach>>();
      const cuonsach = { id: 123 };
      jest.spyOn(cuonsachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cuonsach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cuonsach }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cuonsachService.update).toHaveBeenCalledWith(cuonsach);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Cuonsach>>();
      const cuonsach = new Cuonsach();
      jest.spyOn(cuonsachService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cuonsach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cuonsach }));
      saveSubject.complete();

      // THEN
      expect(cuonsachService.create).toHaveBeenCalledWith(cuonsach);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Cuonsach>>();
      const cuonsach = { id: 123 };
      jest.spyOn(cuonsachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cuonsach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cuonsachService.update).toHaveBeenCalledWith(cuonsach);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSachById', () => {
      it('Should return tracked Sach primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSachById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
