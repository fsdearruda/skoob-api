type User = {
  id: string;
  name: string;
  nickname: string;
  profilePicture: string;
  skoob?: string;
  totalPages: number;
  following: boolean;
  friends: boolean;
};

export type { User };
