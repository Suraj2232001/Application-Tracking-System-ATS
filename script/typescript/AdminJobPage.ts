namespace Typescript{
    export namespace AdminData{
        export class AdminJobPage{
            //all job details ka view....from job details
            viewJob():void{
                let functionName:string = "viewJob";
                let i: number;
                let prodDetails:any;
                let str:any;
                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Add_Jobs", success: (response) => {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                
                                str = "<tr class='data'><td>"+ prodDetails.Job_ID +"</td> <td>"+ prodDetails.Job_Name +"</td><td><button type='button' class='btn btn-dark btnView' data-toggle='modal' data-target='#ViewModel' data-custid=" + prodDetails.Job_ID + " onclick='JobPage.innerView(event)'>View</button></td><td><button type='button' class='btn btn-dark btnDelete' id='btn-Delete' data-custid=" + prodDetails.Job_ID + " onclick='JobPage.deleteJob(event)'>Delete</button></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: (err) => {
                            alert(err)
                            console.log(err);
                        }
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //view button to display modal of the job.....from job details
            innerView(event:any):void{
                let functionName:string = "innerView";
                let prodId = $(event.target).attr("data-custid");
                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Add_Jobs?ID=" + prodId, success: (response) => {
                            
                            $("#ViewModel").modal();
                            $("#ip-prodId").val(response.Job_ID);
                            $("#ip-prodName").val(response.Job_Name);
                            $("#ip-prodLocation").val(response.Job_Location);
                            $("#ip-prodSkills").val(response.Skills);
                            $("#ip-prodHR_Name").val(response.HR_Name);
                        },
                        error: (err) => {
                            alert(err)
                            
                        }
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //insert job button to visible modal......job details
            insertJob():void{
                let functionName:string = "insertJob";
                try{
                        $(".inp").val("");
                        $("#ViewModel").modal();
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //insert dailogue box job for admin/hr......job details
            insertInnerJob():void{
                let functionName:string="insertInnerJob";
                let prodId = $("#ip-prodId").val();
                let prodName = $("#ip-prodName").val();
                let prodLocation = $("#ip-prodLocation").val();
                let prodSkills = $("#ip-prodSkills").val();
                let prodHR_Name = $("#ip-prodHR_Name").val();


                try{

                    if(this.isValid(prodName) && this.isValid(prodLocation) && this.isValid(prodSkills) && this.isValid(prodHR_Name)){
                        $.ajax({
                            type:"POST", url: "http://localhost:53928/api/Add_Jobs", data:{"Job_Name": prodName,"Job_Location": prodLocation,"Skills": prodSkills,"HR_Name": prodHR_Name}, success:()=>{
                                $("#message").html("Data Inserted Successfully");
                            }, 
                            error:(err:any)=>{alert(err);}
                        });
                    }
                    else{
                        this.showMessage("Kindly Fill All details")
                    }
                    
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //delete job for hr/admin.....job details
            deleteJob(event:any):void{
                let functionName:string ="deleteJob";
                let currentRow1 = $(event.target).parent().parent();
                let custId = $(event.target).attr("data-custid");
                try{
                    $.ajax({
                        type:"DELETE",url:"http://localhost:53928/api/Add_Jobs?ID=" +custId, success:()=>{
                            $("#message").html("Data Deleted Successfully");
                            currentRow1.remove();
                        },
                        error:(err) => {
                            alert(err);
                        }
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //main page jobs display for candidate.....for index page
            view_Jobs():void{
                let functionName:string = "viewJob";
                let i: number;
                let prodDetails:any;
                let str:any;
                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Add_Jobs", success: (response) => {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                
                                str = "<tr class='data'><td>"+ prodDetails.Job_ID +"</td> <td>"+ prodDetails.Job_Name +"</td><td>"+ prodDetails.Skills +"</td><td>"+ prodDetails.Job_Location +"</td><td><button type='button' class='btn btn-dark btnView' data-toggle='modal' data-target='#ViewModel' data-custID=" + prodDetails.Job_ID + " data-custName=" + prodDetails.Job_Name + " data-custLocation=" + prodDetails.Job_Location + " data-custSkills=" + prodDetails.Skills + " data-custHR_Name=" + prodDetails.HR_Name + " onclick='JobPage.innerView(event)'>APPLY</button></td><td></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: (err) => {
                            alert(err)
                            console.log(err);
                        }
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //short listed candidates.......input in candidate Info
            transferData():void{
                let functionName:string = "transferData";
                let jobName:string | number | string[]= $("#ip-prodLocation").val();
                let jobLocation:string | number | string[] = $("#ip-prodName").val();
                let UserID = localStorage.getItem("UserID");
                let UserName = localStorage.getItem("UserName");
                let ResumePath:any = $("#prodResumePath").val();
                let Route = ResumePath.slice(11);

                try{
                    $.ajax({
                        type:"POST", url: "http://localhost:53928/api/Candidate_Info", data:{"Cand_ID": UserID,"Cand_Name": UserName,"Job_Role": jobName,"Job_Location": jobLocation,"Resume_Location":"Resume"+Route}, success:()=>{
                            $("#message").html("Data Inserted Successfully");
                        }, 
                        error:(err:any)=>{alert(err);}
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //display data to hr/admin......for candidate info
            appliedJobs():void{
                let functionName:string = "appliedJobs";
                let i: number;
                let prodDetails:any;
                let str:any;
                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/Candidate_Info", success: (response) => {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                
                                str = "<tr class='data'><td>"+ prodDetails.Resume_ID +"</td> <td>"+ prodDetails.Cand_ID +"</td><td>"+ prodDetails.Cand_Name +"</td><td><a href="+prodDetails.Resume_Location+" target='_blank'>View Resume</a></td>><td>"+ prodDetails.Job_Role +"</td>><td>"+ prodDetails.Job_Location +"</td><td><button type='button' class='btn btn-dark btnView' data-custID=" + prodDetails.Job_ID + " data-custName=" + prodDetails.Job_Name + " data-custLocation=" + prodDetails.Job_Location + " data-custSkills=" + prodDetails.Skills + " data-resumeId="+prodDetails.Resume_ID+" data-resumePath="+prodDetails.Resume_Location+" data-custHR_Name=" + prodDetails.HR_Name + " onclick='JobPage.shortlistCand(event)'>Shortlist</button></td><td></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: (err) => {
                            alert(err)
                            console.log(err);
                        }
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //insert the applied candidate to shortlist candidate table
            shortlistCand(event:any):void{
                let functionName:string = "shortlistCand";
                let resumeId = $(event.target).attr("data-resumeId")
                let UserID = localStorage.getItem("UserID");
                let UserName = localStorage.getItem("UserName");
                let Route = $(event.target).attr("data-resumePath")

                try{
                    $.ajax({
                        type:"POST", url: "http://localhost:53928/api/ShortlistedCandidate", data:{"CandID": UserID,"Names": UserName,"Resume_ID": resumeId,"ResumePath":Route}, success:()=>{
                            // $("#message").html("Data Inserted Successfully");
                            alert("shortlisted this candidate");
                        }, 
                        error:(err:any)=>{alert(err);}
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
                }
            }

            //display the short listed candidates from the table
            shortJobs():void{
                let functionName:string = "ShortJobs";
                let i: number;
                let prodDetails:any;
                let str:any;
                try{
                    $.ajax({
                        type: "GET", url: "http://localhost:53928/api/ShortlistedCandidate", success: (response) => {
                            $(".data").remove();
                            for (i = 0; i < response.length; i++) {
                                prodDetails = response[i];
                
                                str = "<tr class='data'><td>"+ prodDetails.Resume_ID +"</td> <td>"+ prodDetails.CandID +"</td><td>"+ prodDetails.Names +"</td><td><a href='"+ prodDetails.ResumePath +"' target='_blank'>View Resume</a></td></tr>";
                                $(".CustTable").append(str);
                            }
                        }, error: (err) => {
                            alert(err)
                            console.log(err);
                        }
                    });
                }
                catch(error:any){
                    JobPage.throwError(functionName, error.message);
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

let JobPage = new Typescript.AdminData.AdminJobPage();