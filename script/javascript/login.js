var Typescript;
(function (Typescript) {
    var AdminData;
    (function (AdminData) {
        var Login = /** @class */ (function () {
            function Login() {
            }
            //Login Script
            Login.prototype.login = function () {
                var functionName = "login";
                var email;
                var password;
                try {
                    email = document.getElementById("email").value;
                    password = document.getElementById("password").value;
                    if (LoginSect.isValid(email) && LoginSect.isValid(password)) {
                        $.ajax({
                            type: "GET", url: "http://localhost:53928/api/Candidate_SignUp?email=" + email + "&pass=" + password, success: function (response) {
                                if (response == null) {
                                    $("#invalid").html("Invalid username and password");
                                }
                                else {
                                    if (response.Cand_UserType == "admin") {
                                        $("#invalid").html("Admin Login Successfull");
                                        window.location.href = "AdminPage.html";
                                    }
                                    else {
                                        localStorage.setItem("UserID", response.Cand_ID);
                                        localStorage.setItem("UserName", response.Cand_Name);
                                        $("#invalid").html("User Login Successfull");
                                        window.location.href = "index.html";
                                    }
                                }
                            },
                            error: function (err) {
                                alert("Error bro....");
                            }
                        });
                    }
                    else {
                        $("#invalid").html("Please enter valid data...");
                    }
                }
                catch (error) {
                    LoginSect.throwError(functionName, error.message);
                }
            };
            //VALIDITY CHECK
            Login.prototype.isValid = function (attribute) {
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
            Login.prototype.throwError = function (functionNameParam, error) {
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
            Login.prototype.showMessage = function (message) {
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
            return Login;
        }());
        AdminData.Login = Login;
    })(AdminData = Typescript.AdminData || (Typescript.AdminData = {}));
})(Typescript || (Typescript = {}));
var LoginSect = new Typescript.AdminData.Login();
