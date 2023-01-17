namespace Typescript{
    export namespace AdminData{
        export class Login{

            //Login Script
            login():void{
                let functionName: string = "login";
                let email: string;
                let password: string;
                try{
                    email = (<HTMLInputElement>document.getElementById("email")).value;
                    password = (<HTMLInputElement>document.getElementById("password")).value;

                    if(LoginSect.isValid(email)&&LoginSect.isValid(password))
                    {
                        $.ajax({
                            type:"GET", url:"http://localhost:53928/api/Candidate_SignUp?email="+email+"&pass="+password, success:(response)=>{
                                if(response == null)
                                {
                                    $("#invalid").html("Invalid username and password");
                                }
                                else{
                                    if(response.Cand_UserType=="admin"){
                                        $("#invalid").html("Admin Login Successfull");
                                        window.location.href="AdminPage.html";
                                    }
                                    else {  
                                        localStorage.setItem("UserID",response.Cand_ID); 
                                        localStorage.setItem("UserName",response.Cand_Name);          
                                        $("#invalid").html("User Login Successfull");
                                        window.location.href="index.html";
                                    }
                                }        
                            }, 
                            error: (err)=>{
                                alert("Error bro....");
                            }
                        });
                    }
                    else{
                        $("#invalid").html("Please enter valid data...");
                    }
                }
                catch(error: any){
                    LoginSect.throwError(functionName, error.message);
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

let LoginSect = new Typescript.AdminData.Login();