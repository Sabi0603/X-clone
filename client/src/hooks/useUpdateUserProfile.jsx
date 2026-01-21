import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../constant/url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (payload) => {
            const res = await fetch(`${baseUrl}/api/users/update`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }
            return data;
        },

        onSuccess: (updatedUser) => {
            toast.success("Profile updated successfully");

            // 🔥 ONLY INVALIDATE – DON’T SET MANUALLY
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });

            // navigate only if username changed
            if (updatedUser?.username) {
                navigate(`/profile/${updatedUser.username}`, { replace: true });
            }
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        updateUserProfile: mutation.mutateAsync,
        isUpdatingProfile: mutation.isPending,
    };
};

export default useUpdateUserProfile;
