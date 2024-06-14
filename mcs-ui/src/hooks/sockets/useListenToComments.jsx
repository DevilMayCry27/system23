import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";

const useListenToComments = (commentList, setCommentList, forumId) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (forumId) {
      socket?.on("FORUM:NEW-COMMENT", (newComment) => {
        if (parseInt(forumId) === parseInt(newComment.ForumId)) {
          setCommentList([newComment, ...commentList]);
        }
      });
    }

    return () => socket?.off("FORUM:NEW-COMMENT");
  }, [forumId, commentList, setCommentList, socket]);

  useEffect(() => {
    if (forumId) {
      socket?.on("FORUM:DELETE-COMMENT", (deletedCommentId) => {
        setCommentList((prevComments) =>
          prevComments.filter(
            (comment) => comment.CommentId !== deletedCommentId
          )
        );
      });
    }

    return () => socket?.off("FORUM:DELETE-COMMENT");
  }, [forumId, setCommentList, socket]);
};
export default useListenToComments;
