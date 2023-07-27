export class Book {
  constructor(
    public isbn: string,
    public titel: string,
    public authers: string[],
    public description: string,
    public subtitel: string,
    public published: boolean,
    public thumbnailUrl: string
  ) { };

  isNotPublished() {
    return !this.published;
  };
}

