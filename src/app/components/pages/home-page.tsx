"use client"
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { postListRequest } from "@/store/action/postAction";
import { format } from "date-fns"

import Header from "../header";
import Image from "next/image";

interface CommentMap {
  [postId: string]: boolean;
}

const HomePage = () => {
  const dispatch = useDispatch();
  const postList = useAppSelector((state: any) => state.post.postList);
  const [showComments, setShowComments] = useState<CommentMap>({});

  const toggleComments = (postId: string) => {
    console.log(postId);
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };
  useEffect(() => {
    dispatch(postListRequest());
  }, []);
  console.log("hello", postList);
  return (
    <>
      <Header />
      <div className="container mx-auto">
        {postList.map((post: any) => {
          return (
            <div className="mb-40" key={post?.post?._id}>
              <h1 className="text-center mt-5">{post?.post?.title}</h1>
              <section className="container d-flex">
                <h2>Author: {post?.author?.name}</h2>
                <p>
                  Created At:{" "}
                  {new Date(post?.post?.created_at).toLocaleDateString()}
                </p>
                <p>{post?.post?.content}</p>
                <button onClick={() => toggleComments(post?.post?._id)} className="toggle-button hover:decoration-slice hover:underline mt-14">
                  {post?.populatedComments?.length} replied
                </button>
                {showComments[post?.post?._id] && (
                  <div>
                    {post?.populatedComments?.map((comment: any) => {
                      return (
                        <div key={comment?.id} className="flex items-start mb-4">
                          <div className="w-7 h-7 rounded-full overflow-hidden mr-1 mt-2">
                            <Image width={100} height={100} src="https://a0.anyrgb.com/pngimg/1912/680/icon-user-profile-avatar-ico-facebook-user-head-black-icons-circle.png" alt="Avatar" />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex ml-4">
                              <p className="font-semibold mr-6">{comment?.author?.username}</p>
                              <p className="text-sm text-gray-500 mt-1">{format(new Date(comment?.comment?.created_at), "dd/MM/yyyy")}</p>
                            </div>
                            <div className="ml-4">{comment?.comment?.content}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default HomePage;
