import { ClockInterface } from "../../application/ports/ClockInterface";

export class SystemClock implements ClockInterface {
  public now(): Date {
    return new Date();
  }
}
