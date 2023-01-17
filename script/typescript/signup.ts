namespace Typescript{
    export namespace AdminData{
        export class Signup{

            //Login Script
            signup():void{
                let functionName: string = "signup";
                let username: string;
                let useremail: string;
                let password: string;
                let cnfpass: string;
                try{
                    username = (<HTMLInputElement>document.getElementById("Username")).value;
                    useremail = (<HTMLInputElement>document.getElementById("Email")).value;
                    password = (<HTMLInputElement>document.getElementById("Password")).value;
                    cnfpass = (<HTMLInputElement>document.getElementById("ConfirmPassword")).value;
                    
                    if(SignupSect.isValid(username)&&SignupSect.isValid(useremail)&&SignupSect.isValid(password))
                    {
                        if(password == cnfpass)
                        {
                            $.ajax({
                                type:"POST", url:"http://localhost:53928/api/Candidate_SignUp", data:{"Cand_Name":username,"Cand_Email":useremail,"Cand_Password":password,"Cand_UserType":"User"}, success: (response) => {
                                    window.location.href="login.html";
                                },
                                error: (err) => {
                                    $("#invalid1").html("password and confirm password does not match");
                                }
                            });
                        }    
                        else{
                            $("#invalid1").html("password and confirm password does not match");
                        }
                    }
                    else{
                        $("#invalid1").html("Kindly Fill all the Details.........");
                    }
                }
                catch(error: any){
                    SignupSect.throwError(functionName, error.message);
                }
            }

            //VALIDITY CHECK
            isValid(attribute: any): boolean {
                let functionName: string = "isValid";
                let isValid: boolean = false;
                try {
                //Validate the attribute and return True or False accordingly
                    if (
                        attribute != null &&
                        attribute != undefined &&
                        attribute != "undefined" &&
                        attribute != "null" &&
                        attribute != ""
                        )
                        isValid = true;
                    } 
                    catch (ex: any) 
                    {
                        throw new Error(functionName + ex.message);
                    }
                    return isValid;
            }

            //ERROR MESSAGE
            throwError(functionNameParam: string, error: any) {
                let functionName: string = "throwError";
                let errorMessage: string = "";
                try {
                    //Concatenate the Message together
                    errorMessage = functionNameParam + ": Error: " + (error.description || error.message);
                    //Show Error Message
                    alert(errorMessage);
                }
                catch (ex: any) 
                {
                    //Concatenate the Message together
                    errorMessage = functionNameParam + ": Error: " + (error.description || error.message);
                    //Show Error Message
                    this.showMessage(functionName + " Error: " + (ex.description || ex.message));
                }
            }

            // THE MESSAGE TO DISPLAY
            showMessage(message: string) {
                let functionName: string = "showMessage";
                try {
                    if (this.isValid(message)) {
                        alert(message);
                    }
                    else {
                        alert(message);
                    }
                }
                catch (ex: any) {
                    this.throwError(functionName, ex.message);
                }
            }
        }
    }
}

let SignupSect = new Typescript.AdminData.Signup();