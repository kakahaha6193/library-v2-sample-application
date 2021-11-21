import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IMuonsach, Muonsach } from '../muonsach.model';
import { MuonsachService } from '../service/muonsach.service';
import { IDocgia } from 'app/entities/docgia/docgia.model';
import { DocgiaService } from 'app/entities/docgia/service/docgia.service';
import { ICuonsach } from 'app/entities/cuonsach/cuonsach.model';
import { CuonsachService } from 'app/entities/cuonsach/service/cuonsach.service';

@Component({
  selector: 'jhi-muonsach-update',
  templateUrl: './muonsach-update.component.html',
})
export class MuonsachUpdateComponent implements OnInit {
  isSaving = false;

  docgiasSharedCollection: IDocgia[] = [];
  cuonsachesSharedCollection: ICuonsach[] = [];

  editForm = this.fb.group({
    id: [],
    ngayMuon: [],
    hanTra: [],
    ngayTra: [],
    trangThai: [],
    docgia: [],
    cuonsach: [],
  });

  constructor(
    protected muonsachService: MuonsachService,
    protected docgiaService: DocgiaService,
    protected cuonsachService: CuonsachService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ muonsach }) => {
      if (muonsach.id === undefined) {
        const today = dayjs().startOf('day');
        muonsach.ngayMuon = today;
        muonsach.hanTra = today;
        muonsach.ngayTra = today;
      }

      this.updateForm(muonsach);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const muonsach = this.createFromForm();
    if (muonsach.id !== undefined) {
      this.subscribeToSaveResponse(this.muonsachService.update(muonsach));
    } else {
      this.subscribeToSaveResponse(this.muonsachService.create(muonsach));
    }
  }

  trackDocgiaById(index: number, item: IDocgia): number {
    return item.id!;
  }

  trackCuonsachById(index: number, item: ICuonsach): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMuonsach>>): void {
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

  protected updateForm(muonsach: IMuonsach): void {
    this.editForm.patchValue({
      id: muonsach.id,
      ngayMuon: muonsach.ngayMuon ? muonsach.ngayMuon.format(DATE_TIME_FORMAT) : null,
      hanTra: muonsach.hanTra ? muonsach.hanTra.format(DATE_TIME_FORMAT) : null,
      ngayTra: muonsach.ngayTra ? muonsach.ngayTra.format(DATE_TIME_FORMAT) : null,
      trangThai: muonsach.trangThai,
      docgia: muonsach.docgia,
      cuonsach: muonsach.cuonsach,
    });

    this.docgiasSharedCollection = this.docgiaService.addDocgiaToCollectionIfMissing(this.docgiasSharedCollection, muonsach.docgia);
    this.cuonsachesSharedCollection = this.cuonsachService.addCuonsachToCollectionIfMissing(
      this.cuonsachesSharedCollection,
      muonsach.cuonsach
    );
  }

  protected loadRelationshipsOptions(): void {
    this.docgiaService
      .query()
      .pipe(map((res: HttpResponse<IDocgia[]>) => res.body ?? []))
      .pipe(map((docgias: IDocgia[]) => this.docgiaService.addDocgiaToCollectionIfMissing(docgias, this.editForm.get('docgia')!.value)))
      .subscribe((docgias: IDocgia[]) => (this.docgiasSharedCollection = docgias));

    this.cuonsachService
      .query()
      .pipe(map((res: HttpResponse<ICuonsach[]>) => res.body ?? []))
      .pipe(
        map((cuonsaches: ICuonsach[]) =>
          this.cuonsachService.addCuonsachToCollectionIfMissing(cuonsaches, this.editForm.get('cuonsach')!.value)
        )
      )
      .subscribe((cuonsaches: ICuonsach[]) => (this.cuonsachesSharedCollection = cuonsaches));
  }

  protected createFromForm(): IMuonsach {
    return {
      ...new Muonsach(),
      id: this.editForm.get(['id'])!.value,
      ngayMuon: this.editForm.get(['ngayMuon'])!.value ? dayjs(this.editForm.get(['ngayMuon'])!.value, DATE_TIME_FORMAT) : undefined,
      hanTra: this.editForm.get(['hanTra'])!.value ? dayjs(this.editForm.get(['hanTra'])!.value, DATE_TIME_FORMAT) : undefined,
      ngayTra: this.editForm.get(['ngayTra'])!.value ? dayjs(this.editForm.get(['ngayTra'])!.value, DATE_TIME_FORMAT) : undefined,
      trangThai: this.editForm.get(['trangThai'])!.value,
      docgia: this.editForm.get(['docgia'])!.value,
      cuonsach: this.editForm.get(['cuonsach'])!.value,
    };
  }
}
