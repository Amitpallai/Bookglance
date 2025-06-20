import NotFound from "@/pages/NotFound";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { AlertCircle, Heart, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { pageTitleAtom } from "@/atoms/meta";
import { toast } from "sonner";

const UserDetails = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  let { userId } = useParams();
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  useEffect(() => setPageTitle("User Profile"), []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader2 className="w-10 h-10 mx-auto animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="flex items-center flex-1 flex-grow w-full max-w-xl col-span-2 p-4 mx-auto my-5 text-center">
      <div className="relative flex flex-col w-full gap-3 p-2 border rounded-lg h-fit border-slate-200 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center border-b px-auto border-slate-200 dark:border-zinc-800">
          <img
            className="absolute w-32 h-32 p-3 border-2 rounded-full shadow-lg -top-20 bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-800"
            src={`https://api.multiavatar.com/${user?._id}.svg`}
            alt="user"
          />
          <div className="flex flex-col justify-center">
            <h5
              title={user?.firstName + " " + user?.lastName}
              className="w-full mb-1 text-3xl font-medium text-gray-900 truncate sm:text-4xl dark:text-zinc-50">
              {user?.firstName} {user?.lastName}
            </h5>
            <span
              title={user?.email}
              className="w-full text-2xl text-gray-500 truncate sm:text-3xl">
              {user?.email}
            </span>
          </div>
          <div className="">
            <Badge variant="outline" className="ml-auto text-lg">
              {user?.role}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-3 dark:text-zinc-50/60">
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center gap-1 text-base">
              <span>
                {user?.likedComments?.length + user?.likedReviews?.length}
              </span>
              <Heart size={18} />
            </span>
            <span>Likes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center gap-1 text-base">
              <span>{user?.reportedBy?.length}</span> <AlertCircle size={18} />
            </span>
            <span>Reports</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center gap-1 text-base">
              <span>{user?.favoriteBooks?.length}</span> <Star size={18} />
            </span>
            <span>Favourites</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
