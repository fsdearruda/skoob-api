import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Essa rota ainda não foi implementada.",
  });
});

export default router;
