import PostServiceImpl from "../../../src/forum/service/PostServiceImpl";
import {Post} from "../../../src/forum/models/Post";
import PostDto from "../../../src/forum/dto/PostDto";

jest.mock('../../../src/forum/models/Post');

describe('PostServiceImpl.addLike', () => {
    let postService: PostServiceImpl;

    beforeEach(() => {
        postService = new PostServiceImpl();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Passed test", async () => {
        const id = "1234"
        const fakePostDto = {
            id: id,
            title: "Test Title",
            content: "Test Content",
            author: "Test Author",
            dateCreated: new Date('2025-02-21'),
            tags: ['node', 'jest'],
            likes: 10,
            comments: [
                {
                    user: "TestUser",
                    message: "TestMessage",
                    dateCreated: new Date('2025-02-21'),
                    likes: 1
                }
            ],
            save: jest.fn().mockResolvedValue(null)
        };

        (Post.findById as jest.Mock).mockResolvedValue(fakePostDto);

        const result = await postService.addLike("1234");

        expect(Post.findById).toHaveBeenCalledWith(id);

        expect(result).toBeInstanceOf(PostDto);
        expect(result.id).toEqual(fakePostDto.id);
        expect(result.title).toEqual(fakePostDto.title);
        expect(result.content).toEqual(fakePostDto.content);
        expect(result.author).toEqual(fakePostDto.author);
        expect(result.dateCreated).toEqual(fakePostDto.dateCreated);
        expect(result.tags).toEqual(fakePostDto.tags);
        expect(result.likes).toEqual(11);
        expect(result.comments).toEqual(fakePostDto.comments);
    })

    test("Failed test", async () => {

        (Post.findById as jest.Mock).mockResolvedValue(null);

        await expect(postService.addLike("UNKNOWN")).rejects.toThrow("post is null");
    })
})