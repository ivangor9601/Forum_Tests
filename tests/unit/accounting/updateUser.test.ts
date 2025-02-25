import {User} from "../../../src/accounting/model/User";
import UserDto from "../../../src/accounting/dto/UserDto";
import UserServiceImpl from "../../../src/accounting/service/UserServiceImpl";

jest.mock('../../../src/accounting/model/User');

describe('UserServiceImpl.updateUser', () => {
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
            roles: ["user"]
        };

        (User.findOneAndUpdate as jest.Mock).mockResolvedValue(fakeUserDto);

        const result = await userService.updateUser("JohnSmith@example.com", "John", "Smith");

        expect(User.findOneAndUpdate).toHaveBeenCalledWith({login: "JohnSmith@example.com"},
            {
                $set: {
                    firstName: "John", lastName: "Smith"
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

        await expect(userService.updateUser("UNKNOWN", "JOHN", "SMITH")).rejects.toThrow("User with login UNKNOWN not found");
    })
})