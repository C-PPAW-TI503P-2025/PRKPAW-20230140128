exports.addUserData = (req, res, next) => {
  console.log('Middleware: Menambahkan data user dummy...');

  const idFromHeader = req.headers['x-user-id'] || req.query.userId;
  const namaFromHeader = req.headers['x-user-name'] || req.query.nama;
  const roleFromHeader = req.headers['x-user-role'] || req.query.role;

  req.user = {
    id: idFromHeader ? Number(idFromHeader) : 123,
    nama: namaFromHeader || 'User Karyawan',
    role: roleFromHeader || 'karyawan'
  };

  console.log(`Middleware: user set => id=${req.user.id}, nama=${req.user.nama}, role=${req.user.role}`);
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('Middleware: Izin admin diberikan.');
    next();
  } else {
    console.log('Middleware: Gagal! Pengguna bukan admin.');
    return res.status(403).json({ message: 'Akses ditolak: Hanya untuk admin' });
  }
};