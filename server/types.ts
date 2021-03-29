import { BuildOptions, Model } from 'sequelize';
import SocketIO from 'socket.io';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  role: string;
  isCompleted: string;
  isBanned: string;
  isActivated: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

export interface PostAttributes {
  id?: number;
  text?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  authorId?: number;
  destinationUserId?: number;
}

export interface PostModel extends Model<PostAttributes>, PostAttributes {}

export type PostStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): PostModel;
};

export enum Gender {
  Male,
  Female,
}

export interface UserInfoAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  country?: string;
  city?: string;
  workPlace?: string;
  dateOfBirth: Date;
  relationship?: string;
  website?: string;
  instagram?: string;
  gender?: Gender;
  avatar?: string;
  userId?: number;
}

declare global {
  interface ParsedToken {
    iss: string;
    sub: string;
    aud: string | string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
    id: number;
    role: string;
  }

  namespace Express {
    interface Request {
      user?: ParsedToken;
      io: SocketIO.Server;
    }
  }
}
