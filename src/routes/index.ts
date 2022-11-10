import { Router } from "express";
import userRoutes from "./users";
import bookRoutes from "./books";
import searchRoutes from "./search";
import reviewRoutes from "./reviews";

const router = Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/search", searchRoutes);
router.use("/reviews", reviewRoutes);

export default router;
