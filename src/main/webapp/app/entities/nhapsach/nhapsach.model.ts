import * as dayjs from 'dayjs';
import { ICuonsach } from 'app/entities/cuonsach/cuonsach.model';
import { IThuthu } from 'app/entities/thuthu/thuthu.model';

export interface INhapsach {
  id?: number;
  ngayGioNhap?: dayjs.Dayjs | null;
  soLuong?: number | null;
  cuonsach?: ICuonsach | null;
  thuthu?: IThuthu | null;
}

export class Nhapsach implements INhapsach {
  constructor(
    public id?: number,
    public ngayGioNhap?: dayjs.Dayjs | null,
    public soLuong?: number | null,
    public cuonsach?: ICuonsach | null,
    public thuthu?: IThuthu | null
  ) {}
}

export function getNhapsachIdentifier(nhapsach: INhapsach): number | undefined {
  return nhapsach.id;
}
