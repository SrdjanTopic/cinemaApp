type User = {
  id?: number;
  username: string;
  email: string;
  password?: string;
  dateOfBirth?: Date;
  isVerified?: boolean;
  isBlocked?: boolean;
  isPasswordValidated?: boolean;
  VerificationToken?: {
    id?: number;
    uuid?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  Role: {
    id: number;
    role: string;
    UserId: number;
  };
  Reservations?: Reservation[];
};
