type Review = {
  book_id: string;
  author_id: string;
  author: string;
  title: string | null;
  date: string;
  review: string;
  rating: number;
  profilePicture: string | null;
};

export default Review;
