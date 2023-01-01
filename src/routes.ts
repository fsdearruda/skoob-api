import { Router } from "express";
import userRoutes from "./routes/users";
import bookRoutes from "./routes/books";
import searchRoutes from "./routes/search";
import reviewRoutes from "./routes/reviews";

const router = Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/search", searchRoutes);
router.use("/reviews", reviewRoutes);

export default router;
