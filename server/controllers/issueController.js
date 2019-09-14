Issue = require('../models/Issue');

exports.index = function (req, res) {
    Issue.get(function (err, issues) {
        if (err) {
            return res.status(404).send(err);
        }
        
        return res.json({
            status: "success",
            message: "Issue retrieved successfully",
            data: issues
        });
    });
};

exports.new = function (req, res) {
    const issue = new Issue(req.body);
    issue.save(function (err) {
        if (err) {
            return res.status(404).send(err);
        } 

        return res.json({
            message: "New issue created!",
            data: issue
        });
    });
};

exports.view = function (req, res) {
    Issue.findById(req.params.issue_id, function (err, issue) {
        if (err) {
            return res.status(404).send(err);
        }

        return res.json({
            message: "Issue details loading..",
            data: issue
        });
    });
};

exports.update = function (req, res) {
    Issue.findById(req.params.issue_id, function (err, issue) {
        if (err) {
            return res.status(404).send(err);
        }

        if (issue.status && issue.status >= req.body.status) {
            return res.status(400).send({
                message: "You can't change status to this status"
            });
        }

        issue.status = req.body.status;
        issue.save(function (err) {
            if (err) {
                return res.status(507).send(err);
            }

            return res.json({
                message: "Issue Info updated",
                data: issue
            });
        });
    });
};

exports.delete = function (req, res) {
    Issue.findById(req.params.issue_id, function (err, issue) {
        if (err) {
            return res.status(404).send(err);
        } else {
            Issue.remove({ _id: req.params.issue_id}, function (err, issue) {
                if (err){
                    return res.status(507).send(err);
                }
                return res.json({
                    status: "success",
                    message: "Issue deleted"
                });
            });
        }
    })
};

exports.deleteAll = function (req, res) {
    Issue.remove({}, function (err) {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.json({
                status: "success",
                message: "All Issues deleted"
            });
        }
    })
}