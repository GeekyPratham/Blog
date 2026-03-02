import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface CommentProps {
    id: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        profileImg?: string;
    };
}

export const UseComments = (blogId: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [commentCount, setCommentCount] = useState<number>(0);

    const fetchComments = async () => {
        setLoading(true);
        console.log("Fetching comments for blog ID:", blogId);
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/comment/${blogId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setComments(res.data.comments || []);
            setCommentCount(res.data.totalComments || 0);
            console.log("Comments fetched successfully:", res.data.comments);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Failed to fetch comments:", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Failed to fetch comments:", error.message);
            } else {
                console.error("Failed to fetch comments:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    return {
        loading,
        comments,
        commentCount,
        refreshComments: fetchComments,
    };
};