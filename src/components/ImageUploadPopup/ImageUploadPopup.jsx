import React, { useEffect, useState } from 'react';
import { GetDtaFromUserUid_DB, subscribeToAuthChanges, updateDocument, uploadImage } from '../../configs/FirebaseMethod';
import alertify from 'alertifyjs';
import { setCurrentUserData, UpateCurrentUserData } from '../../configs/redux/reducers/CurrentUser';
import { useDispatch } from 'react-redux';

const PopupComponent = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [pathProfileImage, setPathProfileImage] = useState(null);
    const [pathCoverImage, setPathCoverImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [docId, setdocId] = useState(null);
    const [userData, SetuserData] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges(async (userUid) => {
            const { userData, docId } = await GetDtaFromUserUid_DB(userUid, "users");
            console.log(docId);

            if (userData.coverImgUrl === null && userData.imgUrl === null) {
                setIsOpen(true);
                SetuserData(userData);
                setdocId({
                    docId,
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const uploadImgsavebtn = async () => {
        if (pathProfileImage && pathCoverImage) {
            console.log('working');
            setLoading(true); // Start loading
            try {
                const coverimg = await uploadImage(pathCoverImage, `${userData.email}${userData.uid}pathCoverImage`);
                const ProfileImage = await uploadImage(pathProfileImage, `${userData.email}${userData.uid}pathProfileImage`);
                const updDoc = await updateDocument('users', docId.docId, {
                    coverImgUrl: coverimg,
                    imgUrl: ProfileImage,
                });
                alertify.success('Success! Upload Images Successfully');
                dispatch(UpateCurrentUserData({
                    coverImgUrl: coverimg,
                    imgUrl: ProfileImage,
                }));
                subscribeToAuthChanges(async (userUid) => {
                    const { userData } = await GetDtaFromUserUid_DB(userUid, "users");
                    dispatch(setCurrentUserData(userData));
                });
                setIsOpen(false);
                console.log(updDoc);
                console.log(coverimg);
                console.log(ProfileImage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // End loading
            }
        } else {
            console.log('not working');
            const { userData } = await GetDtaFromUserUid_DB(userUid, "users");
            dispatch(setCurrentUserData(userData));
        }
    };

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPathProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPathCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={handleClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                    ✖️
                </button>
                <h2 className="text-lg font-semibold text-center mb-4">Edit Profile</h2>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Cover Image</label>
                    <div className="relative mb-4">
                        <img
                            src={coverImage || "https://via.placeholder.com/400x200"}
                            alt="Cover"
                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                        />
                        <label className="absolute top-2 right-2 cursor-pointer">
                            <input
                                type="file"
                                onChange={handleCoverImageChange}
                                className="hidden"
                            />
                            <span className="bg-gray-300 p-2 rounded-full shadow">✏️</span>
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium">Profile Image</label>
                    <div className="relative mb-4">
                        <img
                            src={profileImage || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-36 h-36 object-cover rounded-full border-2 border-gray-300 mx-auto"
                        />
                        <label className="absolute top-2 right-2 cursor-pointer">
                            <input
                                type="file"
                                onChange={handleProfileImageChange}
                                className="hidden"
                            />
                            <span className="bg-gray-300 p-2 rounded-full shadow">✏️</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={uploadImgsavebtn}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex justify-center items-center"
                    disabled={loading} // Disable button during loading
                >
                    {loading ? <span className="loading loading-bars loading-lg"></span> : 'Save Images'} {/* Show loading spinner */}
                </button>
            </div>
        </div>
    );
};

export default PopupComponent;
