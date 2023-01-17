namespace Typescript{
    export namespace AdminData{
        export class AdminUserPage{

            //User Data Display for Admin...... Script
            candAllDetails():void{
                let functionName:string = "candAllDetails";
                let i:number;
                let custDetails:any;
                let str:any;
                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Candidate_SignUp", success: (response) => {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                            custDetails = response[i];

                                var str = "<tr class='data'><td>"+ custDetails.Cand_ID +"</td> <td>"+ custDetails.Cand_Name +"</td><td><button type='button' class='btn btn-dark btnView'  data-toggle='modal' data-target='#ViewModel' data-custid=" + custDetails.Cand_ID + " onclick='UserPage.candViewDetails(event)'>View</button></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, 
                        error: (err) => {
                            alert(err)
                            console.log(err);
                        }
                    });
                }
                catch(error:any){
                    UserPage.throwError(functionName, error.message);
                }
            }

            //view modal for details........for admin page
            candViewDetails(event:any):void{
                let functionName:string = "candViewDetails";
                let custId:string = $(event.target).attr("data-custid");

                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Candidate_SignUp?ID=" + custId, success: (response) => {
                            
                            $("#ViewModel").modal();
                            $("#ip-custId").val(response.Cand_ID);
                            $("#ip-custName").val(response.Cand_Name);
                            $("#ip-custEmail").val(response.Cand_Email);
                            $("#ip-custPass").val(response.Cand_Password);
                            $("#ip-custUser_Type").val(response.Cand_UserType);
                           
                        },
                        error: (err) => {
                            alert(err) 
                        }
                    });
                }
                catch(error:any){
                    UserPage.throwError(functionName, error.message);
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

let UserPage = new Typescript.AdminData.AdminUserPage();