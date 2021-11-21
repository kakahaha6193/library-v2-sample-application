import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ICuonsach, Cuonsach } from '../cuonsach.model';
import { CuonsachService } from '../service/cuonsach.service';
import { ISach } from 'app/entities/sach/sach.model';
import { SachService } from 'app/entities/sach/service/sach.service';

@Component({
  selector: 'jhi-cuonsach-update',
  templateUrl: './cuonsach-update.component.html',
})
export class CuonsachUpdateComponent implements OnInit {
  isSaving = false;

  sachesCollection: ISach[] = [];

  editForm = this.fb.group({
    id: [],
    ngayHetHan: [],
    trangThai: [],
    sach: [],
  });

  constructor(
    protected cuonsachService: CuonsachService,
    protected sachService: SachService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cuonsach }) => {
      if (cuonsach.id === undefined) {
        const today = dayjs().startOf('day');
        cuonsach.ngayHetHan = today;
      }

      this.updateForm(cuonsach);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cuonsach = this.createFromForm();
    if (cuonsach.id !== undefined) {
      this.subscribeToSaveResponse(this.cuonsachService.update(cuonsach));
    } else {
      this.subscribeToSaveResponse(this.cuonsachService.create(cuonsach));
    }
  }

  trackSachById(index: number, item: ISach): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICuonsach>>): void {
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

  protected updateForm(cuonsach: ICuonsach): void {
    this.editForm.patchValue({
      id: cuonsach.id,
      ngayHetHan: cuonsach.ngayHetHan ? cuonsach.ngayHetHan.format(DATE_TIME_FORMAT) : null,
      trangThai: cuonsach.trangThai,
      sach: cuonsach.sach,
    });

    this.sachesCollection = this.sachService.addSachToCollectionIfMissing(this.sachesCollection, cuonsach.sach);
  }

  protected loadRelationshipsOptions(): void {
    this.sachService
      .query({ filter: 'cuonsach-is-null' })
      .pipe(map((res: HttpResponse<ISach[]>) => res.body ?? []))
      .pipe(map((saches: ISach[]) => this.sachService.addSachToCollectionIfMissing(saches, this.editForm.get('sach')!.value)))
      .subscribe((saches: ISach[]) => (this.sachesCollection = saches));
  }

  protected createFromForm(): ICuonsach {
    return {
      ...new Cuonsach(),
      id: this.editForm.get(['id'])!.value,
      ngayHetHan: this.editForm.get(['ngayHetHan'])!.value ? dayjs(this.editForm.get(['ngayHetHan'])!.value, DATE_TIME_FORMAT) : undefined,
      trangThai: this.editForm.get(['trangThai'])!.value,
      sach: this.editForm.get(['sach'])!.value,
    };
  }
}
