export default interface IregisterService {
  register: (email: string, password: string) => Promise<string>;
}
