import { Router } from "express";
import userRoutes from "./user";
import bookRoutes from "./book";
import searchRoutes from "./search";
import reviewRoutes from "./reviews";

const router = Router();

router.use("/user", userRoutes);
router.use("/book", bookRoutes);
router.use("/search", searchRoutes);
router.use("/reviews", reviewRoutes);

export default router;
