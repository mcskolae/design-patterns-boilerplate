import { BookCopyNotAvailableError } from "../errors/BookCopyNotAvailableError";
import { BookCopyId } from "../value-objects/BookCopyId";

export interface BookCopyProps {
  readonly id: BookCopyId;
  readonly available: boolean;
}

export class BookCopy {
  private available: boolean;

  private constructor(private readonly id: BookCopyId, available: boolean) {
    this.available = available;
  }

  public static restore(props: BookCopyProps): BookCopy {
    return new BookCopy(props.id, props.available);
  }

  /** @throws BookCopyNotAvailableError */
  public lend(): void {
    if (!this.available) {
      throw new BookCopyNotAvailableError(this.id);
    }

    this.available = false;
  }

  public giveBack(): void {
    this.available = true;
  }

  public getId(): BookCopyId {
    return this.id;
  }

  public isAvailable(): boolean {
    return this.available;
  }
}
