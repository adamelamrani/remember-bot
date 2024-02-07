export class MessagesNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    this.name = MessagesNotFoundError.name; // Set the name of the error
  }
}
