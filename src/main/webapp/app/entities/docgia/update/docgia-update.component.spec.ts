jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DocgiaService } from '../service/docgia.service';
import { IDocgia, Docgia } from '../docgia.model';

import { DocgiaUpdateComponent } from './docgia-update.component';

describe('Docgia Management Update Component', () => {
  let comp: DocgiaUpdateComponent;
  let fixture: ComponentFixture<DocgiaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let docgiaService: DocgiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DocgiaUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(DocgiaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocgiaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    docgiaService = TestBed.inject(DocgiaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const docgia: IDocgia = { id: 456 };

      activatedRoute.data = of({ docgia });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(docgia));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Docgia>>();
      const docgia = { id: 123 };
      jest.spyOn(docgiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ docgia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: docgia }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(docgiaService.update).toHaveBeenCalledWith(docgia);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Docgia>>();
      const docgia = new Docgia();
      jest.spyOn(docgiaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ docgia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: docgia }));
      saveSubject.complete();

      // THEN
      expect(docgiaService.create).toHaveBeenCalledWith(docgia);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Docgia>>();
      const docgia = { id: 123 };
      jest.spyOn(docgiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ docgia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(docgiaService.update).toHaveBeenCalledWith(docgia);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
