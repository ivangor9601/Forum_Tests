import PostServiceImpl from "../../../src/forum/service/PostServiceImpl";
import {Post} from "../../../src/forum/models/Post";
import PostDto from "../../../src/forum/dto/PostDto";

jest.mock('../../../src/forum/models/Post');

describe('PostServiceImpl.updatePostById', () => {
    let postService: PostServiceImpl;

    beforeEach(() => {
        postService = new PostServiceImpl();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Passed test", async () => {
        const fakePostDto = {
            id: "1234",
            title: "Another Title",
            content: "Another Content",
            author: "Test Author",
            dateCreated: new Date('2025-02-21'),
            tags: ['JavaScript', 'Java'],
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

        const result = await postService.updatePostById("1234", "Another Title", "Another Content", ['JavaScript', 'Java'] as unknown as Set<string>);

        expect(Post.findById).toHaveBeenCalledWith("1234");
        expect(fakePostDto.save).toHaveBeenCalled();

        expect(result).toBeInstanceOf(PostDto);
        expect(result.id).toEqual(fakePostDto.id);
        expect(result.title).toEqual(fakePostDto.title);
        expect(result.content).toEqual(fakePostDto.content);
        expect(result.author).toEqual(fakePostDto.author);
        expect(result.dateCreated).toEqual(fakePostDto.dateCreated);
        expect(result.tags).toEqual(fakePostDto.tags);
        expect(result.likes).toEqual(fakePostDto.likes);
        expect(result.comments).toEqual(fakePostDto.comments);
    })

    test("Failed test", async () => {

        (Post.findById as jest.Mock).mockResolvedValue(null);

        await expect(postService.updatePostById("UNKNOWN", "TITLE", "CONTENT", ["TAGS"] as unknown as Set<string>)).rejects.toThrow("post is null");
    })
})