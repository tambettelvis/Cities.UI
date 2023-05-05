
export class City {


  constructor(
    private id: number,
    private name: string,
    private url: string
  ) { }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUrl(): string {
    return this.url;
  }

}
