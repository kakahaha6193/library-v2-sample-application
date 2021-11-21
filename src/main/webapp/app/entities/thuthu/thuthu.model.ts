export interface IThuthu {
  id?: number;
  hoTen?: string | null;
  username?: string | null;
  password?: string | null;
}

export class Thuthu implements IThuthu {
  constructor(public id?: number, public hoTen?: string | null, public username?: string | null, public password?: string | null) {}
}

export function getThuthuIdentifier(thuthu: IThuthu): number | undefined {
  return thuthu.id;
}
