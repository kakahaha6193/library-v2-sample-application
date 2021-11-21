import * as dayjs from 'dayjs';

export interface IDocgia {
  id?: number;
  hoTen?: string | null;
  ngaySinh?: dayjs.Dayjs | null;
  diaChi?: string | null;
  cmt?: string | null;
  trangThai?: number | null;
  tienCoc?: number | null;
}

export class Docgia implements IDocgia {
  constructor(
    public id?: number,
    public hoTen?: string | null,
    public ngaySinh?: dayjs.Dayjs | null,
    public diaChi?: string | null,
    public cmt?: string | null,
    public trangThai?: number | null,
    public tienCoc?: number | null
  ) {}
}

export function getDocgiaIdentifier(docgia: IDocgia): number | undefined {
  return docgia.id;
}
