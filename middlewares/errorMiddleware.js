const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Lỗi:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Lỗi server" });
};

module.exports = errorMiddleware;
