import BadRequestError from "./BadRequestError";

function asObject(body: unknown): Record<string, unknown> {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new BadRequestError("Request body must be a JSON object.");
  }

  return body as Record<string, unknown>;
}

export function readString(body: unknown, field: string): string {
  const value = asObject(body)[field];

  if (typeof value !== "string") {
    throw new BadRequestError(`Field "${field}" must be a string.`);
  }

  return value;
}

export function readNumber(body: unknown, field: string): number {
  const value = asObject(body)[field];

  if (typeof value !== "number") {
    throw new BadRequestError(`Field "${field}" must be a number.`);
  }

  return value;
}
