import express, { Request, Response, NextFunction } from "express";
import { CommentController } from "../controllers/comment";


export class Comment { 
    
    private commentController: CommentController = new CommentController() 
    
    public routes({ apiv1, apiv2 }): void {   
        
        apiv1('/comments')
            .get(this.commentController.getComments)
            .post(this.commentController.addComment)
        
         
    }
}