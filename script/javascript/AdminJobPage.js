var Typescript;
(function (Typescript) {
    var AdminData;
    (function (AdminData) {
        var AdminJobPage = /** @class */ (function () {
            function AdminJobPage() {
            }
            //all job details ka view....from job details
            AdminJobPage.prototype.viewJob = function () {
                var functionName = "viewJob";
                var i;
                var prodDetails;
                var str;
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Add_Jobs", success: function (response) {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                                str = "<tr class='data'><td>" + prodDetails.Job_ID + "</td> <td>" + prodDetails.Job_Name + "</td><td><button type='button' class='btn btn-dark btnView' data-toggle='modal' data-target='#ViewModel' data-custid=" + prodDetails.Job_ID + " onclick='JobPage.innerView(event)'>View</button></td><td><button type='button' class='btn btn-dark btnDelete' id='btn-Delete' data-custid=" + prodDetails.Job_ID + " onclick='JobPage.deleteJob(event)'>Delete</button></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: function (err) {
                            alert(err);
                            console.log(err);
                        }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //view button to display modal of the job.....from job details
            AdminJobPage.prototype.innerView = function (event) {
                var functionName = "innerView";
                var prodId = $(event.target).attr("data-custid");
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Add_Jobs?ID=" + prodId, success: function (response) {
                            $("#ViewModel").modal();
                            $("#ip-prodId").val(response.Job_ID);
                            $("#ip-prodName").val(response.Job_Name);
                            $("#ip-prodLocation").val(response.Job_Location);
                            $("#ip-prodSkills").val(response.Skills);
                            $("#ip-prodHR_Name").val(response.HR_Name);
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //insert job button to visible modal......job details
            AdminJobPage.prototype.insertJob = function () {
                var functionName = "insertJob";
                try {
                    $(".inp").val("");
                    $("#ViewModel").modal();
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //insert dailogue box job for admin/hr......job details
            AdminJobPage.prototype.insertInnerJob = function () {
                var functionName = "insertInnerJob";
                var prodId = $("#ip-prodId").val();
                var prodName = $("#ip-prodName").val();
                var prodLocation = $("#ip-prodLocation").val();
                var prodSkills = $("#ip-prodSkills").val();
                var prodHR_Name = $("#ip-prodHR_Name").val();
                try {
                    if (this.isValid(prodName) && this.isValid(prodLocation) && this.isValid(prodSkills) && this.isValid(prodHR_Name)) {
                        $.ajax({
                            type: "POST", url: "http://localhost:53928/api/Add_Jobs", data: { "Job_Name": prodName, "Job_Location": prodLocation, "Skills": prodSkills, "HR_Name": prodHR_Name }, success: function () {
                                $("#message").html("Data Inserted Successfully");
                            },
                            error: function (err) { alert(err); }
                        });
                    }
                    else {
                        this.showMessage("Kindly Fill All details");
                    }
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //delete job for hr/admin.....job details
            AdminJobPage.prototype.deleteJob = function (event) {
                var functionName = "deleteJob";
                var currentRow1 = $(event.target).parent().parent();
                var custId = $(event.target).attr("data-custid");
                try {
                    $.ajax({
                        type: "DELETE", url: "http://localhost:53928/api/Add_Jobs?ID=" + custId, success: function () {
                            $("#message").html("Data Deleted Successfully");
                            currentRow1.remove();
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //main page jobs display for candidate.....for index page
            AdminJobPage.prototype.view_Jobs = function () {
                var functionName = "viewJob";
                var i;
                var prodDetails;
                var str;
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Add_Jobs", success: function (response) {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                                str = "<tr class='data'><td>" + prodDetails.Job_ID + "</td> <td>" + prodDetails.Job_Name + "</td><td>" + prodDetails.Skills + "</td><td>" + prodDetails.Job_Location + "</td><td><button type='button' class='btn btn-dark btnView' data-toggle='modal' data-target='#ViewModel' data-custID=" + prodDetails.Job_ID + " data-custName=" + prodDetails.Job_Name + " data-custLocation=" + prodDetails.Job_Location + " data-custSkills=" + prodDetails.Skills + " data-custHR_Name=" + prodDetails.HR_Name + " onclick='JobPage.innerView(event)'>APPLY</button></td><td></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: function (err) {
                            alert(err);
                            console.log(err);
                        }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //short listed candidates.......input in candidate Info
            AdminJobPage.prototype.transferData = function () {
                var functionName = "transferData";
                var jobName = $("#ip-prodLocation").val();
                var jobLocation = $("#ip-prodName").val();
                var UserID = localStorage.getItem("UserID");
                var UserName = localStorage.getItem("UserName");
                var ResumePath = $("#prodResumePath").val();
                var Route = ResumePath.slice(11);
                try {
                    $.ajax({
                        type: "POST", url: "http://localhost:53928/api/Candidate_Info", data: { "Cand_ID": UserID, "Cand_Name": UserName, "Job_Role": jobName, "Job_Location": jobLocation, "Resume_Location": "Resume" + Route }, success: function () {
                            $("#message").html("Data Inserted Successfully");
                        },
                        error: function (err) { alert(err); }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //display data to hr/admin......for candidate info
            AdminJobPage.prototype.appliedJobs = function () {
                var functionName = "appliedJobs";
                var i;
                var prodDetails;
                var str;
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Candidate_Info", success: function (response) {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                                str = "<tr class='data'><td>" + prodDetails.Resume_ID + "</td> <td>" + prodDetails.Cand_ID + "</td><td>" + prodDetails.Cand_Name + "</td><td><a href=" + prodDetails.Resume_Location + " target='_blank'>View Resume</a></td>><td>" + prodDetails.Job_Role + "</td>><td>" + prodDetails.Job_Location + "</td><td><button type='button' class='btn btn-dark btnView' data-custID=" + prodDetails.Job_ID + " data-custName=" + prodDetails.Job_Name + " data-custLocation=" + prodDetails.Job_Location + " data-custSkills=" + prodDetails.Skills + " data-resumeId=" + prodDetails.Resume_ID + " data-resumePath=" + prodDetails.Resume_Location + " data-custHR_Name=" + prodDetails.HR_Name + " onclick='JobPage.shortlistCand(event)'>Shortlist</button></td><td></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: function (err) {
                            alert(err);
                            console.log(err);
                        }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //insert the applied candidate to shortlist candidate table
            AdminJobPage.prototype.shortlistCand = function (event) {
                var functionName = "shortlistCand";
                var resumeId = $(event.target).attr("data-resumeId");
                var UserID = localStorage.getItem("UserID");
                var UserName = localStorage.getItem("UserName");
                var Route = $(event.target).attr("data-resumePath");
                try {
                    $.ajax({
                        type: "POST", url: "http://localhost:53928/api/ShortlistedCandidate", data: { "CandID": UserID, "Names": UserName, "Resume_ID": resumeId, "ResumePath": Route }, success: function () {
                            // $("#message").html("Data Inserted Successfully");
                            alert("shortlisted this candidate");
                        },
                        error: function (err) { alert(err); }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //display the short listed candidates from the table
            AdminJobPage.prototype.shortJobs = function () {
                var functionName = "ShortJobs";
                var i;
                var prodDetails;
                var str;
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/ShortlistedCandidate", success: function (response) {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                                str = "<tr class='data'><td>" + prodDetails.Resume_ID + "</td> <td>" + prodDetails.CandID + "</td><td>" + prodDetails.Names + "</td><td><a href='" + prodDetails.ResumePath + "' target='_blank'>View Resume</a></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: function (err) {
                            alert(err);
                            console.log(err);
                        }
                    });
                }
                catch (error) {
                    JobPage.throwError(functionName, error.message);
                }
            };
            //VALIDITY CHECK
            AdminJobPage.prototype.isValid = function (attribute) {
                var functionName = "isValid";
                var isValid = false;
                try {
                    //Validate the attribute and return True or False accordingly
                    if (attribute != null &&
                        attribute != undefined &&
                        attribute != "undefined" &&
                        attribute != "null" &&
                        attribute != "")
                        isValid = true;
                }
                catch (ex) {
                    throw new Error(functionName + ex.message);
                }
                return isValid;
            };
            //ERROR MESSAGE
            AdminJobPage.prototype.throwError = function (functionNameParam, error) {
                var functionName = "throwError";
                var errorMessage = "";
                try {
                    //Concatenate the Message together
                    errorMessage = functionNameParam + ": Error: " + (error.description || error.message);
                    //Show Error Message
                    alert(errorMessage);
                }
                catch (ex) {
                    //Concatenate the Message together
                    errorMessage = functionNameParam + ": Error: " + (error.description || error.message);
                    //Show Error Message
                    this.showMessage(functionName + " Error: " + (ex.description || ex.message));
                }
            };
            // THE MESSAGE TO DISPLAY
            AdminJobPage.prototype.showMessage = function (message) {
                var functionName = "showMessage";
                try {
                    if (this.isValid(message)) {
                        alert(message);
                    }
                    else {
                        alert(message);
                    }
                }
                catch (ex) {
                    this.throwError(functionName, ex.message);
                }
            };
            return AdminJobPage;
        }());
        AdminData.AdminJobPage = AdminJobPage;
    })(AdminData = Typescript.AdminData || (Typescript.AdminData = {}));
})(Typescript || (Typescript = {}));
var JobPage = new Typescript.AdminData.AdminJobPage();
