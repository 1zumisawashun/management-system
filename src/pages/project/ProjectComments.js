import { useState } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
      // FIXME:被る可能性があるのでuuidに変更する
    };
    console.log(commentToAdd);
    console.log(project.comments);
    await updateDocument(project.id, {
      // スプレッド構文を使ってcommentArrayに追加で上書きする
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-auther">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>date here</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
