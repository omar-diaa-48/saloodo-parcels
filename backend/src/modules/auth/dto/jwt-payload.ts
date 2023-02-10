import { UserType } from "src/utils/types";

export class JwtPayload {
	id: string;
	username: string;
	type: UserType;
	jwt_token?: string;
}