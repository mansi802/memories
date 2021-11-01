import styled from "styled-components/macro";
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./FormCss";
import { useDispatch, useSelector } from "react-redux";

// file imports
import { createPost, setId, updatePost } from "./../redux/actions";

function Form() {
  const makeStyles = useStyles();
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.id);
  const post = useSelector((state) =>
    _id ? state.posts.find((message) => message._id === _id) : null
  );

  const initialPostData = {
    creator: "",
    title: "",
    body: "",
    tags: "",
    selectedFile: "",
  };

  const [postData, setPostData] = useState(initialPostData);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (_id != null) {
      dispatch(updatePost(_id, postData));
    } else {
      dispatch(createPost(postData));
    }

    console.log("clear");
    clear();
  };

  const clear = () => {
    dispatch(setId(null));
    setPostData(initialPostData);
  };

  return (
    <Container>
      <Paper className={makeStyles.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${makeStyles.root} ${makeStyles.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {_id ? `Editing a Memory` : "Creating a Memory"}
          </Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="body"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.body}
            onChange={(e) => setPostData({ ...postData, body: e.target.value })}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={makeStyles.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={makeStyles.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Form;

const Container = styled.div`
  flex: 0.3;
`;
