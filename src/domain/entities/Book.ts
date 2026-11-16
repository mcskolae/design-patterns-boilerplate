class Book {
  private constructor(private readonly id: number) {
  }

  public static from(id: number): Book {
    return new Book(id);
  }

  public getId(): number {
    return this.id;
  }
}

export default Book;
