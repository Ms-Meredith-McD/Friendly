import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import LoadingDotsIcon from './LoadingDotsIcon'
import ReactMarkdown from 'react-markdown'
import { Tooltip as ReactTooltip} from 'react-tooltip'
import NotFound from './NotFound'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'

function ViewSinglePost() {
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()
  const { id } = useParams()
  const [notFound, setNotFound] = useState(false);
  

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token });
        if (response.data) {
          // Assume response.data contains your post data
          setPost(response.data);
          setIsLoading(false); // Hide loading icon
        } else {
          // If no data is returned, consider the post as not found
          setNotFound(true);
        }
      } catch (e) {
        // Handle error or non-200 response as not found
        console.log("There was a problem or the request was canceled.");
        setNotFound(true);
      }
    }
    
    
    fetchPost()
    return () => {
      ourRequest.cancel()
    }
  }, [id]) 

  if (notFound) {
    return <NotFound />;
  }

  if (!isLoading && !post) {
    return <NotFound />
  }

  if (isLoading)
    return (
      <Page title='...'>
        <LoadingDotsIcon />
      </Page>
    )



  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username
    }
    return false
  }

    async function deleteHandler() {
      const areYouSure = window.confirm("Do you really want to delete this post?")
      if (areYouSure) {
        try {
          const response = await Axios.delete(`/post/${id}`, {data: {token: appState.user.token}})
          if (response.data == "Success") {
            //1. display a flash message
            appDispatch({type: "flashMessage", value: "Post was successfully deleted"})

            //2. redirect back to current user's profile
            navigate(`/profile/${appState.user.username}`)
          }
        }catch (e) {
          console.log("There was a problem with deleting")
        }
      }
    }

  return (
    <Page title={post ? post.title : '...'}> {/* Ensure page title doesn't cause an error */}
    {post ? ( // Check if `post` is defined before trying to access its properties
      <div>
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          {isOwner() && (<span className="pt-2">
            <Link to={`/post/${post._id}/edit`} data-tooltip-content="Edit" data-tooltip-id="edit" className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" className="custom-tooltip" />
            <a onClick={deleteHandler} data-tooltip-content="Delete" data-tooltip-id="delete" className="delete-post-button text-danger">
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip id="delete" className="custom-tooltip" />
          </span>

          )}
          
        </div>
        <p className="text-muted small mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img className="avatar-tiny" src={post.author.avatar} alt="avatar" />
          </Link>
          Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {new Date(post.createdDate).toLocaleDateString()}
        </p>
        <div className="body-content">
          <ReactMarkdown children={post.body} allowedElements={["p", "br", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "li"]} />
        </div>
      </div>
    ) : (
      // If `post` is not defined, you can render a placeholder, a loading indicator, or nothing at all
      <div className="text-center">
        <p>Loading post...</p>
      </div>
    )}
  </Page>
);
}

export default ViewSinglePost
