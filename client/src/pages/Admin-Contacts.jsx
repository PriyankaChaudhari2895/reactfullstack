
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


// import {Link} from "react-router-dom";
export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);


    const { authorizationToken } = useAuth();

    const getContactsData =  async()  => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method:"GET",
                headers: {
                    Authorization: authorizationToken ,
                },
            
            });
            const data = await response.json();
           console.log("contacts data:", data);
           if(response.ok) {
setContactData(data);
        }
    }
        catch (error) {
            console.log(error);
        }
         };


//  delete the single  contact data  on delete button 
const deleteContact = async (id) => {
    try{
       const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
           method:"DELETE",
           headers: {
               Authorization: authorizationToken ,
           },
       
       });
       const data = await response.json();
       console.log(`contact after delete: ${data}`);
   
   if (response.ok){
       getContactsData();
        toast.success(
          "Deleted Successfully",
          );
          
       }else{
        toast.error(
          "Something must be wrong. Contact Not Deleted",
          );
       }
   
   
   } catch (error){
       console.log(error);
    
   }
    };

    useEffect(() => {
        getContactsData(); 
            }, []);
    
return (
     <>
   
   <section className="admin-users-section">
          <h1>
             Admin Contacts Data
         </h1>
    
     <div className="container admin-users">

     <table>
             <thead>
                 <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Reply</th>
                       <th>Delete</th>
</tr>
</thead>
<tbody>
    {contactData.map((curContactData, index) => {
        const { username,email, message, _id } = curContactData;
        return (
            <tr key={index}>
                 <td>{username}</td>
                 <td>{email}</td>
                 <td>{message}</td>
                 <td> <Link to={`/admin/contacts/${_id}/reply`}>Reply</Link></td>
                 <td> <button className="btn" onClick={() => deleteContact(_id)}> Delete </button></td>
</tr>
        );
                })}

</tbody>
</table>                                
     </div>
</section> 
 </>
);
};






