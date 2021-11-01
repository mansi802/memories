import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./PostsCss";
import Post from "./Post";

function Posts() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return (
    <Container>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Posts;

const Container = styled.div`
  flex: 0.5;

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;
