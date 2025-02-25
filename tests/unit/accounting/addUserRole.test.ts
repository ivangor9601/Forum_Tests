import {User} from "../../../src/accounting/model/User";
import UserDto from "../../../src/accounting/dto/UserDto";
import UserServiceImpl from "../../../src/accounting/service/UserServiceImpl";

jest.mock('../../../src/accounting/model/User');

describe('UserServiceImpl.addUserRole', () => {
    let userService: UserServiceImpl;

    beforeEach(() => {
        userService = new UserServiceImpl();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Passed test", async () => {
        const fakeUserDto = {
            login: "JohnSmith@example.com",
            firstName: "John",
            lastName: "Smith",
            roles: ["user", "Moderator"]
        };

        (User.findOneAndUpdate as jest.Mock).mockResolvedValue(fakeUserDto);

        const result = await userService.addUserRole("JohnSmith@example.com", "Moderator");

        expect(User.findOneAndUpdate).toHaveBeenCalledWith({login: "JohnSmith@example.com"},
            {
                $addToSet: {
                    roles: "Moderator"
                }
            }, {new: true});

        expect(result).toBeInstanceOf(UserDto);
        expect(result.login).toEqual(fakeUserDto.login);
        expect(result.firstName).toEqual(fakeUserDto.firstName);
        expect(result.lastName).toEqual(fakeUserDto.lastName);
        expect(result.roles).toEqual(fakeUserDto.roles);
    })

    test("Failed test", async () => {

        (User.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

        await expect(userService.addUserRole("UNKNOWN", "MODERATOR")).rejects.toThrow("User with login UNKNOWN not found");
    })
})