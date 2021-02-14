import { BuildOptions, Model } from 'sequelize';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserAttributes {
  id?: string;
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

export enum Gender {
  Male,
  Female,
}

export interface UserInfoAttributes {
  firstName: string;
  lastName: string;
  country?: string;
  workPlace?: string;
  dateOfBirth: Date;
  relationship?: string;
  website?: string;
  instagram?: string;
  gender?: Gender;
  avatar?: string;
}
