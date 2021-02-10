import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid>
      <Grid.Row centered>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h4>Loading posts....</h4>
        ) : (
          data.getPosts &&
          data.getPosts.map(post => (
            <Grid.Column width={4} key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      author {
        name {
          firstname
          lastname
        }
        username
      }
      body
      likeCount
      commentCount
      createdAt
    }
  }
`;

export default Home;
