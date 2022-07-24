import { Gender } from '../../../core/utils/types';

type SignUpDto = {
  email: string;
  password: string;
  profile: {
    gender: Gender;
    location: string;
    name: string;
  };
};

type LoginDto = {
  email: string;
  password: string;
};

const AuthDto = {
  signUpDto: (data: any): SignUpDto => ({
    email: data.email,
    password: data.password,
    profile: {
      name: data.name,
      gender: data.gender,
      location: data.location,
    },
  }),
  loginDto: (data: any): LoginDto => ({
    email: data.email,
    password: data.password,
  }),
};

export default AuthDto;
