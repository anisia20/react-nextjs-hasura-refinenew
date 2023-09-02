import { Session } from 'next-auth';

export class UserSessionData implements Session {
  expires!: string;
  compcode?: string;
  user?:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}
