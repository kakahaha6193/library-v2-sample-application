jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ThuephongService } from '../service/thuephong.service';
import { IThuephong, Thuephong } from '../thuephong.model';
import { IDocgia } from 'app/entities/docgia/docgia.model';
import { DocgiaService } from 'app/entities/docgia/service/docgia.service';
import { IPhongdocsach } from 'app/entities/phongdocsach/phongdocsach.model';
import { PhongdocsachService } from 'app/entities/phongdocsach/service/phongdocsach.service';

import { ThuephongUpdateComponent } from './thuephong-update.component';

describe('Thuephong Management Update Component', () => {
  let comp: ThuephongUpdateComponent;
  let fixture: ComponentFixture<ThuephongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thuephongService: ThuephongService;
  let docgiaService: DocgiaService;
  let phongdocsachService: PhongdocsachService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ThuephongUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ThuephongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThuephongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thuephongService = TestBed.inject(ThuephongService);
    docgiaService = TestBed.inject(DocgiaService);
    phongdocsachService = TestBed.inject(PhongdocsachService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Docgia query and add missing value', () => {
      const thuephong: IThuephong = { id: 456 };
      const docgia: IDocgia = { id: 55586 };
      thuephong.docgia = docgia;

      const docgiaCollection: IDocgia[] = [{ id: 9429 }];
      jest.spyOn(docgiaService, 'query').mockReturnValue(of(new HttpResponse({ body: docgiaCollection })));
      const additionalDocgias = [docgia];
      const expectedCollection: IDocgia[] = [...additionalDocgias, ...docgiaCollection];
      jest.spyOn(docgiaService, 'addDocgiaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thuephong });
      comp.ngOnInit();

      expect(docgiaService.query).toHaveBeenCalled();
      expect(docgiaService.addDocgiaToCollectionIfMissing).toHaveBeenCalledWith(docgiaCollection, ...additionalDocgias);
      expect(comp.docgiasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Phongdocsach query and add missing value', () => {
      const thuephong: IThuephong = { id: 456 };
      const phongdocsach: IPhongdocsach = { id: 80064 };
      thuephong.phongdocsach = phongdocsach;

      const phongdocsachCollection: IPhongdocsach[] = [{ id: 13266 }];
      jest.spyOn(phongdocsachService, 'query').mockReturnValue(of(new HttpResponse({ body: phongdocsachCollection })));
      const additionalPhongdocsaches = [phongdocsach];
      const expectedCollection: IPhongdocsach[] = [...additionalPhongdocsaches, ...phongdocsachCollection];
      jest.spyOn(phongdocsachService, 'addPhongdocsachToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thuephong });
      comp.ngOnInit();

      expect(phongdocsachService.query).toHaveBeenCalled();
      expect(phongdocsachService.addPhongdocsachToCollectionIfMissing).toHaveBeenCalledWith(
        phongdocsachCollection,
        ...additionalPhongdocsaches
      );
      expect(comp.phongdocsachesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thuephong: IThuephong = { id: 456 };
      const docgia: IDocgia = { id: 36964 };
      thuephong.docgia = docgia;
      const phongdocsach: IPhongdocsach = { id: 72976 };
      thuephong.phongdocsach = phongdocsach;

      activatedRoute.data = of({ thuephong });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(thuephong));
      expect(comp.docgiasSharedCollection).toContain(docgia);
      expect(comp.phongdocsachesSharedCollection).toContain(phongdocsach);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Thuephong>>();
      const thuephong = { id: 123 };
      jest.spyOn(thuephongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuephong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thuephong }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(thuephongService.update).toHaveBeenCalledWith(thuephong);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Thuephong>>();
      const thuephong = new Thuephong();
      jest.spyOn(thuephongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuephong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thuephong }));
      saveSubject.complete();

      // THEN
      expect(thuephongService.create).toHaveBeenCalledWith(thuephong);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Thuephong>>();
      const thuephong = { id: 123 };
      jest.spyOn(thuephongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuephong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thuephongService.update).toHaveBeenCalledWith(thuephong);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDocgiaById', () => {
      it('Should return tracked Docgia primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDocgiaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPhongdocsachById', () => {
      it('Should return tracked Phongdocsach primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPhongdocsachById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
