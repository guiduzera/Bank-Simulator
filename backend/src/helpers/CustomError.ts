// classe que me auxilia a criar errors customizados
export default class CustomError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
