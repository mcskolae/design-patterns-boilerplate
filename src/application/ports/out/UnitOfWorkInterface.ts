interface UnitOfWorkInterface {
  run<T>(work: () => Promise<T>): Promise<T>;
}

export default UnitOfWorkInterface;
