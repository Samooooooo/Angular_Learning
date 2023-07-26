export class HousingLocation {
  constructor(
    public id: number,
    public name: string,
    public city: string,
    public state: string,
    public photo: string,
    public availableUnits: number,
    public wifi: boolean,
    public laundry: boolean
  ){ }
}


