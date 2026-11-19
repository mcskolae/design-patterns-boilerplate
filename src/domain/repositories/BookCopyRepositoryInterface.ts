import { BookCopy } from "../entities/BookCopy";
import { BookCopyId } from "../value-objects/BookCopyId";

export interface BookCopyRepositoryInterface {
  findById(id: BookCopyId): Promise<BookCopy | null>;

  save(copy: BookCopy): Promise<void>;
}
