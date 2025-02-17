import { useEffect, useState } from "react";
import { getUserDetails } from "../../services/userService";

export default function Profiles({ email }: { email: string }) {
  const [author, setAuthor] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const profileUser = await getUserDetails(email);
        setAuthor(profileUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [email]);

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold">{author.name}</h2>
      <p>Email: {author.email}</p>
      <p>Bio: {author.bio || "No bio available"}</p>
    </div>
  );
}
