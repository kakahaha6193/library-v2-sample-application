import * as dayjs from 'dayjs';
import { IDocgia } from 'app/entities/docgia/docgia.model';
import { ICuonsach } from 'app/entities/cuonsach/cuonsach.model';

export interface IMuonsach {
  id?: number;
  ngayMuon?: dayjs.Dayjs | null;
  hanTra?: dayjs.Dayjs | null;
  ngayTra?: dayjs.Dayjs | null;
  trangThai?: number | null;
  docgia?: IDocgia | null;
  cuonsach?: ICuonsach | null;
}

export class Muonsach implements IMuonsach {
  constructor(
    public id?: number,
    public ngayMuon?: dayjs.Dayjs | null,
    public hanTra?: dayjs.Dayjs | null,
    public ngayTra?: dayjs.Dayjs | null,
    public trangThai?: number | null,
    public docgia?: IDocgia | null,
    public cuonsach?: ICuonsach | null
  ) {}
}

export function getMuonsachIdentifier(muonsach: IMuonsach): number | undefined {
  return muonsach.id;
}
