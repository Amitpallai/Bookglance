import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Heart,
  Home,
  LogIn,
  LogOut,
  Menu,
  User2,
  Users2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInAtom, userIdAtom, userRoleAtom } from "@/atoms/userData";
import { toast } from "sonner";
import { User } from "lucide-react";

const CollapsibleSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const role = useRecoilValue(userRoleAtom);
  const userId = useRecoilValue(userIdAtom);
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="min-w-fit sm:max-w-64 dark:border-zinc-800">
        <nav className="grid gap-6 text-lg font-medium">
          {isLoggedIn ? (
            <img
              className="w-10 h-10 rounded-full shadow-lg"
             
              alt="user"
            />
          ) : (
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-slate-400 text-slate-50 sm:text-base">
              <BookOpen size={20} />
              <span className="sr-only">BookGlance</span>
            </Link>
          )}
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive
                ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
            }>
            <Home size={20} />
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to={"users/" + userId}
              end
              className={({ isActive }) =>
                isActive
                  ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                  : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
              }>
              <User2 className="w-5 h-5" />
              User
            </NavLink>
          )}

          <NavLink
            to="favourites"
            className={({ isActive }) =>
              isActive
                ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
            }>
            <Heart className="w-5 h-5" />
            Favourites
          </NavLink>
          {role === "admin" && (
            <NavLink
              to="users"
              end
              className={({ isActive }) =>
                isActive
                  ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                  : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
              }>
              <User
              className="w-10 h-10 rounded-full shadow-lg"
            
            />
            </NavLink>
          )}
          {isLoggedIn ? (
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                toast.success("Logged Out Successfully");
              }}
              className="flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400">
              <LogOut className="w-5 h-5" />
              Log Out
            </Link>
          ) : (
            <Link
              onClick={() => {
                navigate("/login");
              }}
              className="flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400">
              <LogIn className="w-5 h-5" />
              Log In
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default CollapsibleSidebar;
