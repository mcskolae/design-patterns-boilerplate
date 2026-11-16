import Book from "../entities/Book";

interface BookRepositoryInterface {
  findById(id: number): Promise<Book | null>;
}

export default BookRepositoryInterface;
