export interface Signup {
  username: string,
  password: string,
  confirmPassword: string
}

const DefaultSignup = () => ({
  username: '',
  password: '',
  confirmPassword: ''
} as Signup);

export { DefaultSignup };