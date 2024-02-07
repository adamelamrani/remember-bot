export class ChatAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    this.name = ChatAlreadyExistsError.name; // Set the name of the error
  }
}
