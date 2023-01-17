var Typescript;
(function (Typescript) {
    var AdminData;
    (function (AdminData) {
        var AdminUserPage = /** @class */ (function () {
            function AdminUserPage() {
            }
            //User Data Display for Admin...... Script
            AdminUserPage.prototype.candAllDetails = function () {
                var functionName = "candAllDetails";
                var i;
                var custDetails;
                var str;
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Candidate_SignUp", success: function (response) {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                custDetails = response[i];
                                var str = "<tr class='data'><td>" + custDetails.Cand_ID + "</td> <td>" + custDetails.Cand_Name + "</td><td><button type='button' class='btn btn-dark btnView'  data-toggle='modal' data-target='#ViewModel' data-custid=" + custDetails.Cand_ID + " onclick='UserPage.candViewDetails(event)'>View</button></td></tr>";
                                $(".CustTable").append(str);
                            }
                        },
                        error: function (err) {
                            alert(err);
                            console.log(err);
                        }
                    });
                }
                catch (error) {
                    UserPage.throwError(functionName, error.message);
                }
            };
            //view modal for details........for admin page
            AdminUserPage.prototype.candViewDetails = function (event) {
                var functionName = "candViewDetails";
                var custId = $(event.target).attr("data-custid");
                try {
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Candidate_SignUp?ID=" + custId, success: function (response) {
                            $("#ViewModel").modal();
                            $("#ip-custId").val(response.Cand_ID);
                            $("#ip-custName").val(response.Cand_Name);
                            $("#ip-custEmail").val(response.Cand_Email);
                            $("#ip-custPass").val(response.Cand_Password);
                            $("#ip-custUser_Type").val(response.Cand_UserType);
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                }
                catch (error) {
                    UserPage.throwError(functionName, error.message);
                }
            };
            //VALIDITY CHECK
            AdminUserPage.prototype.isValid = function (attribute) {
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
            AdminUserPage.prototype.throwError = function (functionNameParam, error) {
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
            AdminUserPage.prototype.showMessage = function (message) {
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
            return AdminUserPage;
        }());
        AdminData.AdminUserPage = AdminUserPage;
    })(AdminData = Typescript.AdminData || (Typescript.AdminData = {}));
})(Typescript || (Typescript = {}));
var UserPage = new Typescript.AdminData.AdminUserPage();
