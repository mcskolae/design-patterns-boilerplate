import BookCopy from "../../../domain/entities/BookCopy";
import BookCopyRepositoryInterface from "../../../domain/repositories/BookCopyRepositoryInterface";
import BookCopyId from "../../../domain/value-objects/BookCopyId";

interface BookCopyRecord {
  readonly id: number;
  readonly available: boolean;
}

class InMemoryBookCopyRepository implements BookCopyRepositoryInterface {
  private readonly records = new Map<number, BookCopyRecord>();

  public async findById(id: BookCopyId): Promise<BookCopy | null> {
    const record = this.records.get(id.toNumber());

    return record === undefined
      ? null
      : BookCopy.restore({ id: BookCopyId.from(record.id), available: record.available });
  }

  public async save(copy: BookCopy): Promise<void> {
    this.records.set(copy.getId().toNumber(), {
      id: copy.getId().toNumber(),
      available: copy.isAvailable(),
    });
  }
}

export default InMemoryBookCopyRepository;
