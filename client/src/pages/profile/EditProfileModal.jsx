import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import userUpdateUserProfile from "../../hooks/useUpdateUserProfile.jsx";

const EditProfileModal = () => {
    const queryClient = useQueryClient();
    const authUser = queryClient.getQueryData(["authUser"]);

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        bio: "",
        link: "",
        newPassword: "",
        currentPassword: "",
    });

    const {updateUserProfile, isUpdatingProfile} = userUpdateUserProfile();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openModal = () => {
        setFormData({
            fullName: authUser?.fullName || "",
            username: authUser?.username || "",
            email: authUser?.email || "",
            bio: authUser?.bio || "",
            link: authUser?.link || "",
            newPassword: "",
            currentPassword: "",
        });
        document.getElementById("edit_profile_modal").showModal();
    };

    return (
        <>
            <button
                className="btn btn-outline rounded-full btn-sm"
                onClick={openModal}
            >
                Edit profile
            </button>

            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box border border-gray-700 rounded-md">
                    <h3 className="font-bold text-lg mb-3">Update Profile</h3>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateUserProfile(formData);
                        }}
                    >
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="input input-bordered w-full"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input input-bordered w-full"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <textarea
                                name="bio"
                                placeholder="Bio"
                                className="textarea textarea-bordered w-full"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Current Password"
                                className="input input-bordered w-full"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                className="input input-bordered w-full"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                            />
                        </div>

                        <input
                            type="text"
                            name="link"
                            placeholder="Link"
                            className="input input-bordered w-full"
                            value={formData.link}
                            onChange={handleInputChange}
                        />

                        <button className="btn btn-primary rounded-full text-white">
                            {isUpdatingProfile ? (
                                <LoadingSpinner size="sm" />
                            ) : (
                                "Update"
                            )}
                        </button>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default EditProfileModal;
