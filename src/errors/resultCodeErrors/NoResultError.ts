import { ResultCodeError } from './ResultCodeError';

export class NoResultError extends ResultCodeError {
  public constructor(message?: string) {
    super(248, message ?? 'No result message for the request.');
  }
}
