import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import router, { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { tempMovieDetail } from "../../utils/tempMovieDetails";
import MovieDetailsOverview from "../../components/MoveDetails";

const MovieDetails: NextPage = () => {
  const { data: session } = useSession();

  const nrouter = useRouter();
  const { movieId } = nrouter.query;
  const movieDetails = trpc.useQuery(["movie.get-movie-details", { id: movieId as string }]);

  if (movieDetails.isLoading) return <div>Loading..</div>;

  if (movieDetails.isError) return <h1>Not found</h1>;

  if (!session?.user) {
    router.push({
      pathname: "/",
    });
  }

  return (
    <div>
      <>
        {movieDetails.data && (
          <>
            <MovieDetailsOverview movie={movieDetails.data} />
          </>
        )}
      </>
    </div>
  );
};

export default MovieDetails;
