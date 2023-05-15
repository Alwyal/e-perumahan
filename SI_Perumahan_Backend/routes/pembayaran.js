const Pembayaran = require('../models/pembayaranmodel');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const bayar = await Pembayaran.findAll();
    res.json(bayar)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const bayar = await Pembayaran.findOne({
        where: {
            id: id
        }
    });
    res.json(bayar)
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const tanggal = req.body.tanggal;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    const status = req.body.status;
    const bayar = await Pembayaran.create({
        name: name,
        tanggal: tanggal,
        keterangan: keterangan,
        image: image,
        
        status: status,
        
    });
    res.json(bayar)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const bayar = await Pembayaran.update({
        status: status
    }, {
        where: {
            id: id
        }
    })
    res.json(bayar)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const bayar = await Pembayaran.destroy({
        where: {
            id: id
        }
    });
    res.json(bayar)
});

module.exports = router;