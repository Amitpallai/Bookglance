import React, { useState, useEffect } from "react";
import { reviewSchema } from "@/schema";
import axios from "axios";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import Rating from "./Rating";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@/atoms/userData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Review = ({ book, isEditing, reviewId, handleUserReply }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: "",
      rating: 0,
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    if (isEditing) {
      let promise = axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/books/${
          book._id
        }/reviews/${reviewId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.promise(promise, {
        loading: "Loading...",
        success: (response) => {
          handleUserReply();
          return response.data.message;
        },
        error: (error) => error.response.data.message,
        finally: () => setIsLoading(false),
      });
    } else {
      let promise = axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/books/${book._id}/reviews/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.promise(promise, {
        loading: "Loading...",
        success: (response) => {
          handleUserReply();
          return response.data.message;
        },
        error: (error) => {
          navigate("/login");
          return isLoggedIn
            ? error.response.data.message
            : "You need to Login to write a review";
        },
        finally: () => setIsLoading(false),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 mb-2 space-y-2 border-2 rounded-lg border-slate-200 dark:border-zinc-800">
        <Rating form={form} />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-1 sm:col-span-3">
              <FormLabel className="text-left text-lg pl-0.5">
                {isEditing ? "Edit the Review" : "Leave a Review"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief review of the book..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" variant="outline">
            {isEditing ? "Edit" : "Submit"}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default Review;
