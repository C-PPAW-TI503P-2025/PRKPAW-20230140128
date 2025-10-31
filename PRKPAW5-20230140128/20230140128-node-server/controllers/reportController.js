const { Presensi } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

exports.getDailyReports = async (req, res) => {
  try {
    const { tanggalMulai, tanggalSelesai } = req.query;

    // Format dan validasi tanggal
    let startDate = tanggalMulai ? moment(tanggalMulai).startOf('day').toDate() : moment().startOf('day').toDate();
    let endDate = tanggalSelesai ? moment(tanggalSelesai).endOf('day').toDate() : moment().endOf('day').toDate();

    // Ambil data presensi berdasarkan rentang tanggal
    const data = await Presensi.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['createdAt', 'ASC']]
    });

    return res.status(200).json({
      reportDate: `${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`,
      data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
