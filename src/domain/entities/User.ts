class User {
  private constructor(
    private readonly id: number,
    private readonly email: string,
    private readonly lastName: string,
    private readonly firstName: string,
  ) {
  }

  public static from(id: number, email: string, lastName: string, firstName: string): User {
    return new User(id, email, lastName, firstName);
  }

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getFirstName(): string {
    return this.firstName;
  }
}

export default User;
