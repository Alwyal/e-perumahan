const Berita = require('../models/beritamodel');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const berita = await Berita.findAll();
    res.json(berita)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const berita = await Berita.findOne({
        where: {
            id: id
        }
    });
    res.json(berita)
});

router.post('/', async (req, res) => {
    const judul = req.body.judul;
    const keterangan = req.body.keterangan;
    const gambar = req.body.gambar;
    const berita = await Berita.create({
        judul: judul,
        keterangan: keterangan,
        gambar: gambar,
    });
    res.json(berita)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const judul = req.body.judul;
    const keterangan = req.body.keterangan;
    const gambar = req.body.gambar;
    const berita = await Berita.update({
        judul: judul,
        keterangan: keterangan,
        gambar: gambar,
    }, {
        where: {
            id: id
        }
    })
    res.json(berita)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const berita = await Berita.destroy({
        where: {
            id: id
        }
    });
    res.json(berita)
});

module.exports = router;