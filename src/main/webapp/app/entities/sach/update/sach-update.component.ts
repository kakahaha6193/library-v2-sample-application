import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISach, Sach } from '../sach.model';
import { SachService } from '../service/sach.service';
import { INhaxuatban } from 'app/entities/nhaxuatban/nhaxuatban.model';
import { NhaxuatbanService } from 'app/entities/nhaxuatban/service/nhaxuatban.service';

@Component({
  selector: 'jhi-sach-update',
  templateUrl: './sach-update.component.html',
})
export class SachUpdateComponent implements OnInit {
  isSaving = false;

  nhaxuatbansCollection: INhaxuatban[] = [];

  editForm = this.fb.group({
    id: [],
    tenSach: [],
    giaNiemYet: [],
    tacgia: [],
    giaThue: [],
    nganXep: [],
    theloai: [],
    nhaxuatban: [],
  });

  constructor(
    protected sachService: SachService,
    protected nhaxuatbanService: NhaxuatbanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sach }) => {
      this.updateForm(sach);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sach = this.createFromForm();
    if (sach.id !== undefined) {
      this.subscribeToSaveResponse(this.sachService.update(sach));
    } else {
      this.subscribeToSaveResponse(this.sachService.create(sach));
    }
  }

  trackNhaxuatbanById(index: number, item: INhaxuatban): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISach>>): void {
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

  protected updateForm(sach: ISach): void {
    this.editForm.patchValue({
      id: sach.id,
      tenSach: sach.tenSach,
      giaNiemYet: sach.giaNiemYet,
      tacgia: sach.tacgia,
      giaThue: sach.giaThue,
      nganXep: sach.nganXep,
      theloai: sach.theloai,
      nhaxuatban: sach.nhaxuatban,
    });

    this.nhaxuatbansCollection = this.nhaxuatbanService.addNhaxuatbanToCollectionIfMissing(this.nhaxuatbansCollection, sach.nhaxuatban);
  }

  protected loadRelationshipsOptions(): void {
    this.nhaxuatbanService
      .query({ filter: 'sach-is-null' })
      .pipe(map((res: HttpResponse<INhaxuatban[]>) => res.body ?? []))
      .pipe(
        map((nhaxuatbans: INhaxuatban[]) =>
          this.nhaxuatbanService.addNhaxuatbanToCollectionIfMissing(nhaxuatbans, this.editForm.get('nhaxuatban')!.value)
        )
      )
      .subscribe((nhaxuatbans: INhaxuatban[]) => (this.nhaxuatbansCollection = nhaxuatbans));
  }

  protected createFromForm(): ISach {
    return {
      ...new Sach(),
      id: this.editForm.get(['id'])!.value,
      tenSach: this.editForm.get(['tenSach'])!.value,
      giaNiemYet: this.editForm.get(['giaNiemYet'])!.value,
      tacgia: this.editForm.get(['tacgia'])!.value,
      giaThue: this.editForm.get(['giaThue'])!.value,
      nganXep: this.editForm.get(['nganXep'])!.value,
      theloai: this.editForm.get(['theloai'])!.value,
      nhaxuatban: this.editForm.get(['nhaxuatban'])!.value,
    };
  }
}
