import UnitOfWorkInterface from "../../../application/ports/out/UnitOfWorkInterface";

class InMemoryUnitOfWork implements UnitOfWorkInterface {
  private queue: Promise<unknown> = Promise.resolve();

  public run<T>(work: () => Promise<T>): Promise<T> {
    const result = this.queue.then(work, work);
    this.queue = result.catch(() => undefined);

    return result;
  }
}

export default InMemoryUnitOfWork;
