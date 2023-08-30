import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handlePostCreate = (postText) => {
    if (postText.trim() === '') {
      return;
    }

    const newPost = {
      text: postText,
      comments: [],
    };

    setPosts([...posts, newPost]);
  };

  const handleCommentAdd = (postIndex, commentText) => {
    const newPosts = [...posts];
    newPosts[postIndex].comments.push(commentText);
    setPosts(newPosts);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.text.toLowerCase().includes(searchText) ||
      post.comments.some((comment) => comment.toLowerCase().includes(searchText))
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Post and Comment App</h1>
      </header>
      <main className="App-main">
        <section className="App-section">
          <h2>Create a Post</h2>
          <PostForm onCreatePost={handlePostCreate} />
        </section>
        <section className="App-section">
          <h2>Search</h2>
          <input
            type="text"
            placeholder="Search posts and comments"
            onChange={handleSearch}
            value={searchText}
          />
        </section>
        <section className="App-section">
          <h2>Results</h2>
          <div className="App-results">
            {filteredPosts.map((post, index) => (
              <Post
                key={index}
                index={index}
                post={post}
                onAddComment={handleCommentAdd}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function PostForm({ onCreatePost }) {
  const [postText, setPostText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreatePost(postText);
    setPostText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Write your post here"
      />
      <button type="submit">Create Post</button>
    </form>
  );
}

function Post({ index, post, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddComment(index, commentText);
    setCommentText('');
  };

  return (
    <div className="App-post">
      <p>{post.text}</p>
      <form onSubmit={handleSubmit}>
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add Comment</button>
      </form>
      {post.comments.length > 0 && (
        <div className="App-comments">
          {post.comments.map((comment, commentIndex) => (
            <p key={commentIndex}>{comment}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
