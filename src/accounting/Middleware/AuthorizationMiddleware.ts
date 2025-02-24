import {ExpressMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import PostService from "../../forum/service/PostService";
import PostServiceImpl from "../../forum/service/PostServiceImpl";

export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
    postService:PostService = new PostServiceImpl();
    async use(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const body = request.body.user;
            const hasRoleAdministrator = body.roles.some((role:string)=> "administrator" === role.toLowerCase());
            const hasRoleModerator = body.roles.some((role:string)=> "moderator" === role.toLowerCase());
            let match = request.url.match(new RegExp("/account/user/.*/role/.*"));
            if((request.method === "PUT" ||  request.method === "DELETE") && match ){
                if(!hasRoleAdministrator){
                    return response.status(403).json({message: "No permissions"});
                }
            }
            match = request.url.match(new RegExp("/account/user/.*"));
            if((request.method === "DELETE") && match ){
                const user = request.url.split("/")[3];
                const hasOwner = user === body.login;
                if(!hasRoleAdministrator && !hasOwner){
                    return response.status(403).json({message: "No permissions"});
                }
            }
            match = request.url.match(new RegExp("/forum/post/.*"));
            if((request.method === "DELETE") && match ){
                const postId = request.url.split("/")[3];
                const postDto = await this.postService.findPostById(postId);
                const author = postDto.author;
                const hasOwner = author === body.login;
                if(!hasRoleModerator && !hasOwner){
                    return response.status(403).json({message: "No permissions"});
                }
            }
            next();
        } catch (error) {
            return response.status(500).json({message: "Server error"});
        }
    }
}