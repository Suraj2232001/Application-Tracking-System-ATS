var Typescript;
(function (Typescript) {
    var AdminData;
    (function (AdminData) {
        var Signup = /** @class */ (function () {
            function Signup() {
            }
            //Login Script
            Signup.prototype.signup = function () {
                var functionName = "signup";
                var username;
                var useremail;
                var password;
                var cnfpass;
                try {
                    username = document.getElementById("Username").value;
                    useremail = document.getElementById("Email").value;
                    password = document.getElementById("Password").value;
                    cnfpass = document.getElementById("ConfirmPassword").value;
                    if (SignupSect.isValid(username) && SignupSect.isValid(useremail) && SignupSect.isValid(password)) {
                        if (password == cnfpass) {
                            $.ajax({
                                type: "POST", url: "http://localhost:53928/api/Candidate_SignUp", data: { "Cand_Name": username, "Cand_Email": useremail, "Cand_Password": password, "Cand_UserType": "User" }, success: function (response) {
                                    window.location.href = "login.html";
                                },
                                error: function (err) {
                                    $("#invalid1").html("password and confirm password does not match");
                                }
                            });
                        }
                        else {
                            $("#invalid1").html("password and confirm password does not match");
                        }
                    }
                    else {
                        $("#invalid1").html("Kindly Fill all the Details.........");
                    }
                }
                catch (error) {
                    SignupSect.throwError(functionName, error.message);
                }
            };
            //VALIDITY CHECK
            Signup.prototype.isValid = function (attribute) {
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
            Signup.prototype.throwError = function (functionNameParam, error) {
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
            Signup.prototype.showMessage = function (message) {
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
            return Signup;
        }());
        AdminData.Signup = Signup;
    })(AdminData = Typescript.AdminData || (Typescript.AdminData = {}));
})(Typescript || (Typescript = {}));
var SignupSect = new Typescript.AdminData.Signup();
