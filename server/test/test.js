let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../index");
chai.use(chaiHttp);

describe("Issues", function(){

    describe ("DELETE ALL", function(){
        it("should remove all first", done=>{
            chai.request(server)
                .delete("/api/issues")
                .send({})
                .end((err,res)=>{
                    res.should.have.status(200);
                    console.log("Response Body:", res.body);
                    done()
                })
        })
    })

    describe ("CRUD OPERATIONS", function(){
        const issues = [{
            "status": 0,
            "title": "title1",
            "description": "desc1",
        }, {
            "title": "title2",
            "description": "desc2",
        }];

        let secondIssueId;

        it("Should add Issues in DB", (done) => {
            for (issue in issues) {
                chai.request(server)
                    .post("/api/issues/")
                    .send(issues[issue])
                    .end((err, res) => {
                        res.should.have.status(200);
                    })
            }
            done()
        })

        it ("Should Fecth all the Issues", (done)=>{
            chai.request(server)
                .get("/api/issues")
                .end((err, result)=>{
                    result.should.have.status(200);
                    result.body.data.should.have.length(2)
                    console.log("Got", result.body.data.length, "issues", result.body.data[0]._id);
                    secondIssueId = result.body.data[0]._id;
                    done()
                })
        })

        it ("Should Fetch Particular Book only", (done)=>{
            chai.request(server)
                .get("/api/issues/" + secondIssueId)
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Fetched second issue using /GET/issues/:issue_id ::::", result.body)
                    done()
                })
        })

        it ("Should update status Issue from 0 to 1", (done)=>{
            var updateIssue1 = {
                "status": 1,
            }
            
            chai.request(server)
                .put("/api/issues/" + secondIssueId)
                .send(updateIssue1)
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Updated status of Issue ", result.body)
                    done()
                })
        })

        it ("Should't update status ID of Issue from 1 to 0", (done)=>{
            var updateIssue2 = {
                "status": 0,
            }
            
            chai.request(server)
                .put("/api/issues/" + secondIssueId)
                .send(updateIssue2)
                .end((err, result)=>{                    
                    result.should.have.status(400)
                    console.log("----> Dont't update status of Issue ", result.body.message);
                    done()
                })
        })

        it("Should Delete Issue", (done)=>{
            chai.request(server)
                .delete("/api/issues/"+ secondIssueId)
                .end((err, result)=>{                    
                    result.should.have.status(200)                
                    console.log("----> Deleted Issue ::::", result.body)    
                    done()
                })
        })

    });

})
