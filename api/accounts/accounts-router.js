const router = require('express').Router()
const middlewares = require("./accounts-middleware.js");
const Account = require("./accounts-model.js");

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch(error) {
    next(error);
  }
})

router.get('/:id', middlewares.checkAccountId, async (req, res, next) => {
  res.json(req.account);
})

router.post(
  '/', 
  middlewares.checkAccountPayload, 
  middlewares.checkAccountNameUnique, 
  async (req, res, next) => {
  try {
    const newAccount = await Account.create({ 
      name: req.body.name.trim(),
      budget: req.body.budget
    });
    res.status(201).json(newAccount);
  } catch(error) {
    next(error);
  }
})

router.put('/:id',
  middlewares.checkAccountId,
  middlewares.checkAccountPayload, 
  async (req, res, next) => {
  try {
    const updated = await Account.updateById(req.params.id, req.body);
    res.json(updated);
  } catch(error) {
    next(error);
  }
});

router.delete('/:id', middlewares.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch(error) {
    next(error);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  });
})

module.exports = router;
