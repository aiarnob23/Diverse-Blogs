import { useState } from "react";

  
export default function Search() {
    const [searchTerm, setSearchTerm] = useState<any>(null);
  return (
      <div> 
          <div>
              <input type="text"
                  value={searchTerm}
                  placeholder="Search for blogs..."
                  onChange={(e)=>setSearchTerm(e.target.value)}
              />
         </div>
      </div>
  );
}