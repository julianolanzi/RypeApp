export interface UserUpdateRequest {
  id: string;
  nickname: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  url: string;
  gender: string;
  country: string;
  birthday: Date | undefined;
  verify: boolean;
  social: {
    discord: string;
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
    twitch: string;
    psn: string;
    xbox: string;
    idGame: string;
  }
  address: {
    city: string;
    district: string;
    number: string;
    street1: string;
    street2: string;
    zipcode: string;
  }

}
