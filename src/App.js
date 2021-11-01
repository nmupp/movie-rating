import logo from './logo.svg';
import './App.css';
import { Card, CardContent, CardMedia, Grid, Typography, IconButton, CardActions } from '@mui/material';
import moviebgrnd from './movies.jpg'
import movieLogo from './movie-logo.png'
import ThumbDown from '@mui/icons-material/ThumbDown';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { useQuery } from 'react-query';

function App() {
  const {error, data, isLoading} = useQuery("movies", async () => {
    const movies = await fetch("http://localhost:3001/movies")
    return movies.json()
  })

  if(error) {
    return "error"
  }

  if(isLoading) {
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
            data.map(({name}, index) => {
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
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <IconButton onClick={() => {
                        console.log("I like this")
                      }}>
                        <ThumbUp fontSize="medium" />
                      </IconButton>
                      <IconButton onClick={() => {
                        console.log("I dislike this")
                      }}>
                        <ThumbDown fontSize="medium" />
                      </IconButton>
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
