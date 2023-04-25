import { User } from "./user";

export class Leave {
  id?: number;
  startDate?: Date;
  user?: User;
  endDate?: Date;
  type?: string;
  comment?: string;
  firstName?: string;
  email?: string;

  constructor(
    id?: number,
    startDate?: Date,
    user?: User,
    endDate?: Date,
    type?: string,
    comment?: string,
    firstName?: string,
    email?: string
  ) {
    this.id = id;
    this.startDate = startDate || new Date();
    this.user = user;
    this.endDate = endDate || new Date();
    this.type = type;
    this.comment = comment;
    this.firstName = firstName;
    this.email = email;
  }
}
