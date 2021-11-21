import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { INhapsach, Nhapsach } from '../nhapsach.model';
import { NhapsachService } from '../service/nhapsach.service';
import { ICuonsach } from 'app/entities/cuonsach/cuonsach.model';
import { CuonsachService } from 'app/entities/cuonsach/service/cuonsach.service';
import { IThuthu } from 'app/entities/thuthu/thuthu.model';
import { ThuthuService } from 'app/entities/thuthu/service/thuthu.service';

@Component({
  selector: 'jhi-nhapsach-update',
  templateUrl: './nhapsach-update.component.html',
})
export class NhapsachUpdateComponent implements OnInit {
  isSaving = false;

  cuonsachesSharedCollection: ICuonsach[] = [];
  thuthusSharedCollection: IThuthu[] = [];

  editForm = this.fb.group({
    id: [],
    ngayGioNhap: [],
    soLuong: [],
    cuonsach: [],
    thuthu: [],
  });

  constructor(
    protected nhapsachService: NhapsachService,
    protected cuonsachService: CuonsachService,
    protected thuthuService: ThuthuService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nhapsach }) => {
      if (nhapsach.id === undefined) {
        const today = dayjs().startOf('day');
        nhapsach.ngayGioNhap = today;
      }

      this.updateForm(nhapsach);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nhapsach = this.createFromForm();
    if (nhapsach.id !== undefined) {
      this.subscribeToSaveResponse(this.nhapsachService.update(nhapsach));
    } else {
      this.subscribeToSaveResponse(this.nhapsachService.create(nhapsach));
    }
  }

  trackCuonsachById(index: number, item: ICuonsach): number {
    return item.id!;
  }

  trackThuthuById(index: number, item: IThuthu): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INhapsach>>): void {
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

  protected updateForm(nhapsach: INhapsach): void {
    this.editForm.patchValue({
      id: nhapsach.id,
      ngayGioNhap: nhapsach.ngayGioNhap ? nhapsach.ngayGioNhap.format(DATE_TIME_FORMAT) : null,
      soLuong: nhapsach.soLuong,
      cuonsach: nhapsach.cuonsach,
      thuthu: nhapsach.thuthu,
    });

    this.cuonsachesSharedCollection = this.cuonsachService.addCuonsachToCollectionIfMissing(
      this.cuonsachesSharedCollection,
      nhapsach.cuonsach
    );
    this.thuthusSharedCollection = this.thuthuService.addThuthuToCollectionIfMissing(this.thuthusSharedCollection, nhapsach.thuthu);
  }

  protected loadRelationshipsOptions(): void {
    this.cuonsachService
      .query()
      .pipe(map((res: HttpResponse<ICuonsach[]>) => res.body ?? []))
      .pipe(
        map((cuonsaches: ICuonsach[]) =>
          this.cuonsachService.addCuonsachToCollectionIfMissing(cuonsaches, this.editForm.get('cuonsach')!.value)
        )
      )
      .subscribe((cuonsaches: ICuonsach[]) => (this.cuonsachesSharedCollection = cuonsaches));

    this.thuthuService
      .query()
      .pipe(map((res: HttpResponse<IThuthu[]>) => res.body ?? []))
      .pipe(map((thuthus: IThuthu[]) => this.thuthuService.addThuthuToCollectionIfMissing(thuthus, this.editForm.get('thuthu')!.value)))
      .subscribe((thuthus: IThuthu[]) => (this.thuthusSharedCollection = thuthus));
  }

  protected createFromForm(): INhapsach {
    return {
      ...new Nhapsach(),
      id: this.editForm.get(['id'])!.value,
      ngayGioNhap: this.editForm.get(['ngayGioNhap'])!.value
        ? dayjs(this.editForm.get(['ngayGioNhap'])!.value, DATE_TIME_FORMAT)
        : undefined,
      soLuong: this.editForm.get(['soLuong'])!.value,
      cuonsach: this.editForm.get(['cuonsach'])!.value,
      thuthu: this.editForm.get(['thuthu'])!.value,
    };
  }
}
