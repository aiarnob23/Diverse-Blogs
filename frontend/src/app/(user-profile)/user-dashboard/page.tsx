import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

   
const UserDashboard = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
  return (
      <div> 
         {session?.user?.name}
      </div>
  );
}
export default UserDashboard;