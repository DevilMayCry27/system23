import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";

const useListenToForums = (forumList, setForumList, DepartmentId) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (DepartmentId) {
      socket?.on("FORUM:NEW-POST", (DepartmentIds, newForum) => {
        const deptIds = [...DepartmentIds];
        if (deptIds?.includes(DepartmentId)) {
          setForumList([newForum, ...forumList]);
        }
      });
    }

    return () => socket?.off("FORUM:NEW-POST");
  }, [DepartmentId, forumList, setForumList, socket]);

  useEffect(() => {
    if (DepartmentId) {
      socket?.on("FORUM:UPDATE-POST", (ForumId, newForum) => {
        const deptIds = newForum.DepartmentTagIds.map((data) =>
          parseInt(data.DepartmentId)
        );

        if (deptIds?.includes(DepartmentId)) {
          console.log(
            "🚀 ~ file: useListenToForums.jsx:23 ~ socket?.on ~ newForum:",
            newForum
          );
          setForumList((prevData) =>
            prevData.map((forum) =>
              forum.ForumId === ForumId ? newForum : forum
            )
          );
        }
      });
    }

    return () => socket?.off("FORUM:UPDATE-POST");
  }, [DepartmentId, forumList, setForumList, socket]);

  useEffect(() => {
    if (DepartmentId) {
      socket?.on("FORUM:DELETE-POST", (deletedForumId) => {
        setForumList((prevForums) =>
          prevForums.filter((forum) => forum.ForumId !== deletedForumId)
        );
      });
    }

    return () => socket?.off("FORUM:DELETE-POST");
  }, [DepartmentId, setForumList, socket]);
};
export default useListenToForums;
