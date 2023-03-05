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

export interface IRequests {
  username: string;
  photo: string;
  id: number;
  date: string;
}

export interface IMESSAGE {
  message: string;
  date: string;
  sender_id: number;
}
