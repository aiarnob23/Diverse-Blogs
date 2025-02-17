export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
    name: string,
    email: string,
    isVerified?: boolean,
    otp?:string,
}

