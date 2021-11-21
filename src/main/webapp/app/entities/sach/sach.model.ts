import { INhaxuatban } from 'app/entities/nhaxuatban/nhaxuatban.model';

export interface ISach {
  id?: number;
  tenSach?: string | null;
  giaNiemYet?: number | null;
  tacgia?: string | null;
  giaThue?: number | null;
  nganXep?: string | null;
  theloai?: string | null;
  nhaxuatban?: INhaxuatban | null;
}

export class Sach implements ISach {
  constructor(
    public id?: number,
    public tenSach?: string | null,
    public giaNiemYet?: number | null,
    public tacgia?: string | null,
    public giaThue?: number | null,
    public nganXep?: string | null,
    public theloai?: string | null,
    public nhaxuatban?: INhaxuatban | null
  ) {}
}

export function getSachIdentifier(sach: ISach): number | undefined {
  return sach.id;
}
