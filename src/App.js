import logo from './logo.svg';
import './App.css';
import { Card, CardContent, CardMedia, Grid, Typography, IconButton, CardActions } from '@mui/material';
import moviebgrnd from './movies.jpg'
import movieLogo from './movie-logo.png'
import ThumbDown from '@mui/icons-material/ThumbDown';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { useMutation, useQuery, useQueryClient } from 'react-query';

function App() {
  const queryClient = useQueryClient()
  const { error, data, isLoading } = useQuery("movies", async () => {
    const movies = await fetch("http://localhost:3001/movies")
    return movies.json()
  })

  const likesMutation = useMutation(async ({ id }) => {
    const movies = await fetch(`http://localhost:3001/movies/${id}/likes`, {
      method: "PATCH"
    })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("movies")
      },
      onError: () => {
        console.log('Error while updating likes')
      }
    }
  )

  const dislikesMutation = useMutation(async ({ id }) => {
    const movies = await fetch(`http://localhost:3001/movies/${id}/dislikes`, {
      method: "PATCH"
    })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("movies")
      },
      onError: () => {
        console.log('Error while updating likes')
      }
    }
  )

  if (error) {
    return "error"
  }

  if (isLoading) {
    return "this is still loading"
  }

  return (
    <div style={{
      background: `url(${moviebgrnd})`,
      height: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }}
    >
      <Grid container direction="column" style={{ padding: "2%" }}>
        <Grid item>
          <img src={movieLogo} />
        </Grid>
        <Grid item container direction="row" style={{ marginTop: "2%" }} spacing={4}>
          {
            data.map(({ name, description, likes, dislikes, _id }, index) => {
              return (
                <Grid item key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="iframe"
                      src="https://www.youtube.com/embed/yl1OzLPewLQ"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <div style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <IconButton onClick={() => {
                          console.log("I like this")
                          likesMutation.mutate({id: _id})
                        }}>
                          <ThumbUp fontSize="medium" />
                        </IconButton>
                        <label style={{ fontSize: "14px" }}>{likes}</label>
                      </div>
                      <div>
                        <IconButton onClick={() => {
                          console.log("I dislike this")
                          dislikesMutation.mutate({id: _id})
                        }}>
                          <ThumbDown fontSize="medium" />
                        </IconButton>
                        <label>{dislikes}</label>
                      </div>

                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
