export interface IUSER {
  username: string;
  photo: string;
  id: number;
  details: string | null;
}

export interface IProfile {
  user: IUSER;
  isMe: boolean;
  isContact: boolean;
}
