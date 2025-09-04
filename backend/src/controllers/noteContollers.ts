import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import noteModel from "../models/noteModel";
import userModel from "../models/userModel";
import mongoose from "mongoose";

interface CustomJwtPayload extends JwtPayload {
  email: string;
  id: string;
}

interface RequestWithUser extends Request {
  user?: CustomJwtPayload;
}

export const createNoteController = async (req: RequestWithUser, res: Response) => {
    try {
        
        if(!req.user || !req.user.email) return res.status(400).send({
            success: false,
            message: 'user not found',
        })

        const {title, noteBody} = req.body;

        if(!title || !noteBody){
            return res.status(400).send({
                success: false,
                message: "please fill all the fields"
            })
        }

        const notes = await noteModel.create({
            title,
            noteBody,
            user : req.user?.id
        })

        const user = await userModel.findById(req.user?.id);

        if(!user) return res.status(401).send({
            success: false,
            message: "user not found"
        })

        user.notes.push(notes._id as mongoose.Types.ObjectId);
        user.save()

        return res.status(200).send({
            success: true,
            message: "notes created"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating note.",
        })
    }
}

export const readAllNotesController = async ( req: RequestWithUser, res: Response) => {
    try {
        const user = await userModel.findById(req.user?.id).populate("notes")

        if(!user) return res.status(401).send({
            success: false,
            message: "user not found"
        })

        const notes = user.notes;

        if(notes.length == 0){
            return res.status(200).send({
                success: true,
                message: "notes were not created",
            })
        }

        res.status(200).send({
            success: true,
            notes,
            message: "notes sent successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in creating note.",
        })
    }
}

export const readOneNotesController = async ( req: RequestWithUser, res: Response) => {
    try {
        const noteId = req.params.id;

        if(!noteId) return res.status(401).send({
            success: false,
            message: "id not found"
        })

        const notes = await noteModel.findById(noteId)

        if(!notes){
            return res.status(200).send({
                success: true,
                message: "notes not found",
            })
        }

        res.status(200).send({
            success: true,
            notes,
            message: "notes sent successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in creating note.",
        })
    }
}

export const updateNotesController = async ( req: RequestWithUser, res: Response) => {
    try {
        const noteId = req.params.id;

        if(!noteId) return res.status(401).send({
            success: false,
            message: "id not found"
        })

        const {title, noteBody} = req.body;

        await noteModel.findByIdAndUpdate({_id: noteId},{title,noteBody})

        return res.status(200).send({
            success: true,
            message: 'notes are updated'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in creating note.",
        })
    }
}

export const deleteNotesController = async ( req: RequestWithUser, res: Response) => {
    try {
        const noteId = req.params.id;

        if(!noteId) return res.status(401).send({
            success: false,
            message: "id not found"
        })

        await noteModel.findByIdAndDelete({_id: noteId})

        return res.status(200).send({
            success: true,
            message: 'notes are deleted'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in creating note.",
        })
    }
}
