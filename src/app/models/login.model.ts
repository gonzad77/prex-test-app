export interface Login {
  username: string,
  password: string,
}

const DefaultLogin = () => ({
  username: '',
  password: '',
} as Login);

export { DefaultLogin };