import { CommentController } from "../controllers/comment";
import { catchErrors } from '../helpers';

export class Comment {

    private commentController: CommentController = new CommentController()

    public routes({ apiv1, apiv2 }): void {

        apiv1('/comments')
            .get(catchErrors(this.commentController.getComments))
            .post(catchErrors(this.commentController.addComment))


    }
}
