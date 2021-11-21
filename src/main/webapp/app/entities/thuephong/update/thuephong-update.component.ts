import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IThuephong, Thuephong } from '../thuephong.model';
import { ThuephongService } from '../service/thuephong.service';
import { IDocgia } from 'app/entities/docgia/docgia.model';
import { DocgiaService } from 'app/entities/docgia/service/docgia.service';
import { IPhongdocsach } from 'app/entities/phongdocsach/phongdocsach.model';
import { PhongdocsachService } from 'app/entities/phongdocsach/service/phongdocsach.service';

@Component({
  selector: 'jhi-thuephong-update',
  templateUrl: './thuephong-update.component.html',
})
export class ThuephongUpdateComponent implements OnInit {
  isSaving = false;

  docgiasSharedCollection: IDocgia[] = [];
  phongdocsachesSharedCollection: IPhongdocsach[] = [];

  editForm = this.fb.group({
    id: [],
    ngayThue: [],
    ca: [],
    docgia: [],
    phongdocsach: [],
  });

  constructor(
    protected thuephongService: ThuephongService,
    protected docgiaService: DocgiaService,
    protected phongdocsachService: PhongdocsachService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thuephong }) => {
      if (thuephong.id === undefined) {
        const today = dayjs().startOf('day');
        thuephong.ngayThue = today;
      }

      this.updateForm(thuephong);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thuephong = this.createFromForm();
    if (thuephong.id !== undefined) {
      this.subscribeToSaveResponse(this.thuephongService.update(thuephong));
    } else {
      this.subscribeToSaveResponse(this.thuephongService.create(thuephong));
    }
  }

  trackDocgiaById(index: number, item: IDocgia): number {
    return item.id!;
  }

  trackPhongdocsachById(index: number, item: IPhongdocsach): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThuephong>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(thuephong: IThuephong): void {
    this.editForm.patchValue({
      id: thuephong.id,
      ngayThue: thuephong.ngayThue ? thuephong.ngayThue.format(DATE_TIME_FORMAT) : null,
      ca: thuephong.ca,
      docgia: thuephong.docgia,
      phongdocsach: thuephong.phongdocsach,
    });

    this.docgiasSharedCollection = this.docgiaService.addDocgiaToCollectionIfMissing(this.docgiasSharedCollection, thuephong.docgia);
    this.phongdocsachesSharedCollection = this.phongdocsachService.addPhongdocsachToCollectionIfMissing(
      this.phongdocsachesSharedCollection,
      thuephong.phongdocsach
    );
  }

  protected loadRelationshipsOptions(): void {
    this.docgiaService
      .query()
      .pipe(map((res: HttpResponse<IDocgia[]>) => res.body ?? []))
      .pipe(map((docgias: IDocgia[]) => this.docgiaService.addDocgiaToCollectionIfMissing(docgias, this.editForm.get('docgia')!.value)))
      .subscribe((docgias: IDocgia[]) => (this.docgiasSharedCollection = docgias));

    this.phongdocsachService
      .query()
      .pipe(map((res: HttpResponse<IPhongdocsach[]>) => res.body ?? []))
      .pipe(
        map((phongdocsaches: IPhongdocsach[]) =>
          this.phongdocsachService.addPhongdocsachToCollectionIfMissing(phongdocsaches, this.editForm.get('phongdocsach')!.value)
        )
      )
      .subscribe((phongdocsaches: IPhongdocsach[]) => (this.phongdocsachesSharedCollection = phongdocsaches));
  }

  protected createFromForm(): IThuephong {
    return {
      ...new Thuephong(),
      id: this.editForm.get(['id'])!.value,
      ngayThue: this.editForm.get(['ngayThue'])!.value ? dayjs(this.editForm.get(['ngayThue'])!.value, DATE_TIME_FORMAT) : undefined,
      ca: this.editForm.get(['ca'])!.value,
      docgia: this.editForm.get(['docgia'])!.value,
      phongdocsach: this.editForm.get(['phongdocsach'])!.value,
    };
  }
}
