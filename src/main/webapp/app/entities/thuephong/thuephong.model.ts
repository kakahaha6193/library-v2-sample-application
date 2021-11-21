import * as dayjs from 'dayjs';
import { IDocgia } from 'app/entities/docgia/docgia.model';
import { IPhongdocsach } from 'app/entities/phongdocsach/phongdocsach.model';

export interface IThuephong {
  id?: number;
  ngayThue?: dayjs.Dayjs | null;
  ca?: number | null;
  docgia?: IDocgia | null;
  phongdocsach?: IPhongdocsach | null;
}

export class Thuephong implements IThuephong {
  constructor(
    public id?: number,
    public ngayThue?: dayjs.Dayjs | null,
    public ca?: number | null,
    public docgia?: IDocgia | null,
    public phongdocsach?: IPhongdocsach | null
  ) {}
}

export function getThuephongIdentifier(thuephong: IThuephong): number | undefined {
  return thuephong.id;
}
