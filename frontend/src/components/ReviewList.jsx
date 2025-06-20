import { Loader2, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Progress } from "./ui/progress";
import { formatNumber } from "@/utilities/formatNum";
import { toast } from "sonner";

const ReviewList = ({ book, userReplyCounter, setUserReplyCounter }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/${book._id}/reviews/`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, [counter, userReplyCounter]);

  const [meta, setMeta] = useState({
    totalReviews: 4000,
    averageRating: 4.0,
    initialReviews: 3340,
    stars: [50, 200, 300, 1000, 2000],
  });
  const stars = [0, 0, 0, 0, 0];

  useEffect(() => {
    if (!reviews) return;
    let total = 0;
    reviews.map((review) => {
      stars[review.rating - 1]++;
      total += review.rating;
    });
    setMeta({
      totalReviews: reviews.length,
      averageRating: reviews.length === 0 ? 0 : total / reviews.length,
      initialReviews: 1,
      stars: stars,
    });
  }, [reviews]);

  const handleRatingFilterChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredReviews = reviews.filter((review) =>
    selectedRating ? review.rating === selectedRating : true
  );

  const sortedReviews = filteredReviews.sort((a, b) => {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  if (isLoading) {
    return (
      <div className="grid items-center w-full">
        <Loader2 className="w-10 h-10 mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full max-w-5xl m-auto mt-5 overflow-hidden rounded-lg">
      <h2 className="text-2xl font-semibold tracking-tight scroll-m-20 lg:text-3xl">
        Ratings and Reviews
      </h2>

      {/* Filter and Sort Dropdowns */}
      <div className="flex justify-between py-4 my-2 border-b-2 border-slate-200 dark:border-zinc-800">
        <div className="flex gap-4">
          {/* Rating Filter Dropdown */}
          <div>
            <label
              htmlFor="ratingFilter"
              className="font-semibold text-gray-900 text-md dark:text-white"
            >
              Filter by Rating
            </label>
            <select
              id="ratingFilter"
              value={selectedRating || ""}
              onChange={handleRatingFilterChange}
              className="p-2 ml-2 text-gray-900 bg-white border-2 rounded-lg border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Star{rating > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by Date Dropdown */}
          <div>
            <label
              htmlFor="sortOrder"
              className="font-semibold text-gray-900 text-md dark:text-white"
            >
              Sort by Date
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="p-2 ml-2 text-gray-900 bg-white border-2 rounded-lg border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 py-4 my-2 text-sm border-b-2 sm:grid-cols-2 md:grid-cols-3 border-slate-200 dark:border-zinc-800">
        <div className="flex flex-col justify-center p-4 pl-10 border-2 rounded-lg sm:pl-4 border-slate-200 dark:border-zinc-800">
          <h3 className="mb-2 font-bold text-md">Total Reviews</h3>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold">
              {formatNumber(meta.totalReviews)}
            </p>
            <p className="flex items-center gap-1 px-3 py-1 font-medium text-green-700 bg-green-100 rounded-full">
              {(
                ((meta.totalReviews - meta.initialReviews) /
                  meta.initialReviews) *
                100
              ).toFixed(0)}
              % <TrendingUp size={20} />
            </p>
          </div>
          <p className="text-sm text-gray-500/60">
            Growth in reviews this year
          </p>
        </div>
        <div className="flex flex-col justify-center p-4 pl-10 border-2 rounded-lg sm:pl-4 border-slate-200 dark:border-zinc-800">
          <h3 className="mb-2 font-bold text-md">Average Rating</h3>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold">
              {meta.averageRating.toFixed(1)}
            </p>

            <Star size={30} color="gold" fill="gold" />
          </div>
          <p className="text-sm text-gray-500/60">Average Rating this year</p>
        </div>
        <div className="flex flex-col justify-center gap-2 p-4 border-2 rounded-lg sm:col-span-2 md:col-span-1 border-slate-200 dark:border-zinc-800">
          <div className="flex items-center h-3 gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>5</span>
            <Progress
              value={(meta.stars[4] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-teal-400"
              className="h-2"
            />
          </div>
          <div className="flex items-center h-3 gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>4</span>
            <Progress
              value={(meta.stars[3] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-purple-400"
              className="h-2"
            />
          </div>
          <div className="flex items-center h-3 gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>3</span>
            <Progress
              value={(meta.stars[2] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-yellow-400"
              className="h-2"
            />
          </div>
          <div className="flex items-center h-3 gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>2</span>
            <Progress
              value={(meta.stars[1] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-blue-400"
              className="h-2"
            />
          </div>
          <div className="flex items-center h-3 gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>1</span>
            <Progress
              value={(meta.stars[0] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-gray-400"
              className="h-2"
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            setCounter={setCounter}
            counter={counter}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewList;
