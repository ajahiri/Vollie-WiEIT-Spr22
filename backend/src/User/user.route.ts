import express from "express";
import { wrapAsync } from "../utility";
import {
    getAllUsers,
    getUserById,
    createUser,
    setUserPassword,
    getOwnTags,
    getOwnUser,
    setApprovalVolunteerTypeForUser,
} from "./user.controller";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/self", wrapAsync(getOwnUser));
router.get("/:id", getUserById);
router.post("/create", wrapAsync(createUser));
router.post("/resetpassword", setUserPassword);
router.get("/owntags", wrapAsync(getOwnTags));
router.post("/set-volunteerType-approval/:volunteerTypeID/:userID/:status", wrapAsync(setApprovalVolunteerTypeForUser));

export = router;
