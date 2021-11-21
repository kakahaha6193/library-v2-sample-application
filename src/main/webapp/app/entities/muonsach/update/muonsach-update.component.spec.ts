jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MuonsachService } from '../service/muonsach.service';
import { IMuonsach, Muonsach } from '../muonsach.model';
import { IDocgia } from 'app/entities/docgia/docgia.model';
import { DocgiaService } from 'app/entities/docgia/service/docgia.service';
import { ICuonsach } from 'app/entities/cuonsach/cuonsach.model';
import { CuonsachService } from 'app/entities/cuonsach/service/cuonsach.service';

import { MuonsachUpdateComponent } from './muonsach-update.component';

describe('Muonsach Management Update Component', () => {
  let comp: MuonsachUpdateComponent;
  let fixture: ComponentFixture<MuonsachUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let muonsachService: MuonsachService;
  let docgiaService: DocgiaService;
  let cuonsachService: CuonsachService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MuonsachUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(MuonsachUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MuonsachUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    muonsachService = TestBed.inject(MuonsachService);
    docgiaService = TestBed.inject(DocgiaService);
    cuonsachService = TestBed.inject(CuonsachService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Docgia query and add missing value', () => {
      const muonsach: IMuonsach = { id: 456 };
      const docgia: IDocgia = { id: 75780 };
      muonsach.docgia = docgia;

      const docgiaCollection: IDocgia[] = [{ id: 63197 }];
      jest.spyOn(docgiaService, 'query').mockReturnValue(of(new HttpResponse({ body: docgiaCollection })));
      const additionalDocgias = [docgia];
      const expectedCollection: IDocgia[] = [...additionalDocgias, ...docgiaCollection];
      jest.spyOn(docgiaService, 'addDocgiaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ muonsach });
      comp.ngOnInit();

      expect(docgiaService.query).toHaveBeenCalled();
      expect(docgiaService.addDocgiaToCollectionIfMissing).toHaveBeenCalledWith(docgiaCollection, ...additionalDocgias);
      expect(comp.docgiasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cuonsach query and add missing value', () => {
      const muonsach: IMuonsach = { id: 456 };
      const cuonsach: ICuonsach = { id: 61412 };
      muonsach.cuonsach = cuonsach;

      const cuonsachCollection: ICuonsach[] = [{ id: 41066 }];
      jest.spyOn(cuonsachService, 'query').mockReturnValue(of(new HttpResponse({ body: cuonsachCollection })));
      const additionalCuonsaches = [cuonsach];
      const expectedCollection: ICuonsach[] = [...additionalCuonsaches, ...cuonsachCollection];
      jest.spyOn(cuonsachService, 'addCuonsachToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ muonsach });
      comp.ngOnInit();

      expect(cuonsachService.query).toHaveBeenCalled();
      expect(cuonsachService.addCuonsachToCollectionIfMissing).toHaveBeenCalledWith(cuonsachCollection, ...additionalCuonsaches);
      expect(comp.cuonsachesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const muonsach: IMuonsach = { id: 456 };
      const docgia: IDocgia = { id: 3462 };
      muonsach.docgia = docgia;
      const cuonsach: ICuonsach = { id: 25393 };
      muonsach.cuonsach = cuonsach;

      activatedRoute.data = of({ muonsach });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(muonsach));
      expect(comp.docgiasSharedCollection).toContain(docgia);
      expect(comp.cuonsachesSharedCollection).toContain(cuonsach);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Muonsach>>();
      const muonsach = { id: 123 };
      jest.spyOn(muonsachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ muonsach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: muonsach }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(muonsachService.update).toHaveBeenCalledWith(muonsach);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Muonsach>>();
      const muonsach = new Muonsach();
      jest.spyOn(muonsachService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ muonsach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: muonsach }));
      saveSubject.complete();

      // THEN
      expect(muonsachService.create).toHaveBeenCalledWith(muonsach);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Muonsach>>();
      const muonsach = { id: 123 };
      jest.spyOn(muonsachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ muonsach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(muonsachService.update).toHaveBeenCalledWith(muonsach);
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

    describe('trackCuonsachById', () => {
      it('Should return tracked Cuonsach primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCuonsachById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
