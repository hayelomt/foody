import { Gender } from '../../../core/utils/types';

type SignUpUserDto = {
  email: string;
  password: string;
  profile: {
    gender: Gender;
    location: string;
    name: string;
  };
};

export type SignUpManagerDto = {
  email: string;
  password: string;
  profile: {
    name: string;
  };
};

type LoginDto = {
  email: string;
  password: string;
};

const AuthDto = {
  signUpUserDto: (data: any): SignUpUserDto => ({
    email: data.email,
    password: data.password,
    profile: {
      name: data.name,
      gender: data.gender,
      location: data.location,
    },
  }),

  signUpManagerDto: (data: any): SignUpManagerDto => ({
    email: data.email,
    password: data.password,
    profile: {
      name: data.name,
    },
  }),

  loginDto: (data: any): LoginDto => ({
    email: data.email,
    password: data.password,
  }),
};

export default AuthDto;
