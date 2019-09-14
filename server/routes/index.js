let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Working',
        message: 'Welcome to issue tracker API'
    });
});

var issueController = require('../controllers/issueController');

router.route('/issues')
    .get(issueController.index)
    .post(issueController.new)
    .delete(issueController.deleteAll);
    
router.route('/issues/:issue_id')
    .get(issueController.view)
    .put(issueController.update)
    .delete(issueController.delete);
    

module.exports = router;