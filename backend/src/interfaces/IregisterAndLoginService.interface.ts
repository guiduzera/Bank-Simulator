export default interface IregisterService {
  register: (username: string, password: string) => Promise<string>;
  login: (username: string, password: string) => Promise<string>;
  getUser: (id: number) => Promise<string>;
}
