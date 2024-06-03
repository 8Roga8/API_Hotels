const catchError = require('../utils/catchError');
const Review = require('../models/Review');

const getAll = catchError(async(req, res) => {
    const { hotelId, offset, perPage } = req.query;
    const where = {};
    if (hotelId) where.hotelId = hotelId;
    const reviews = await Review.findAll({
        where: where,
        offset: offset,
        limit: perPage
    });
    return res.json(reviews);
});

const create = catchError(async(req, res) => {
    const {rating, comment, hotelId} = req.body;
    const review = await Review.create({
        rating,
        comment,
        hotelId,
        userId: req.user.id
    });
    return res.status(201).json(review);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if(!review) return res.sendStatus(404);
    return res.json(review);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Review.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.params;
    const review = await Review.update(
        { rating, comment},
        { where: {id}, returning: true }
    );
    if(review[0] === 0) return res.sendStatus(404);
    return res.json(review[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}