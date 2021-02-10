
export class CreateUserCommand {
    readonly fullname: string;
    readonly email: string;
    readonly password: string;

    async isValid() {
        return Promise.resolve(true);
    }
}
