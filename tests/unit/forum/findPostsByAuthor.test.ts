import PostServiceImpl from "../../../src/forum/service/PostServiceImpl";
import {Post} from "../../../src/forum/models/Post";
import PostDto from "../../../src/forum/dto/PostDto";

jest.mock('../../../src/forum/models/Post');

describe('PostServiceImpl.findPostByAuthor', () => {
    let postService: PostServiceImpl;

    beforeEach(() => {
        postService = new PostServiceImpl();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Passed test", async () => {
        const id = "1234"
        const fakeRes = [{
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
        },{
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
        }];

        (Post.find as jest.Mock).mockResolvedValue(fakeRes);

        const result = await postService.findPostsByAuthor("Test Author");

        expect(Post.find).toHaveBeenCalledWith({author: "Test Author"});

        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(PostDto);
        expect(result[0].id).toEqual(fakeRes[0].id);
        expect(result[0].title).toEqual(fakeRes[0].title);
        expect(result[0].content).toEqual(fakeRes[0].content);
        expect(result[0].author).toEqual(fakeRes[0].author);
        expect(result[0].dateCreated).toEqual(fakeRes[0].dateCreated);
        expect(result[0].tags).toEqual(fakeRes[0].tags);
        expect(result[0].likes).toEqual(fakeRes[0].likes);
        expect(result[0].comments).toEqual(fakeRes[0].comments);
        expect(result[1]).toBeInstanceOf(PostDto);
        expect(result[1].id).toEqual(fakeRes[1].id);
        expect(result[1].title).toEqual(fakeRes[1].title);
        expect(result[1].content).toEqual(fakeRes[1].content);
        expect(result[1].author).toEqual(fakeRes[1].author);
        expect(result[1].dateCreated).toEqual(fakeRes[1].dateCreated);
        expect(result[1].tags).toEqual(fakeRes[1].tags);
        expect(result[1].likes).toEqual(fakeRes[1].likes);
        expect(result[1].comments).toEqual(fakeRes[1].comments);
    })

    test("Failed test", async () => {

        (Post.find as jest.Mock).mockResolvedValue([]);

        await expect(postService.findPostsByAuthor("UNKNOWN")).rejects.toThrow("No posts found for author: UNKNOWN");
    })
})