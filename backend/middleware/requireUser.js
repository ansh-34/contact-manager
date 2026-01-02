export default function requireUser(req, res, next) {
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(400).json({ message: "x-user-id header is required" });
  }
  req.userId = userId;
  next();
}
