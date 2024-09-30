import React, { useEffect, useState } from 'react';
import BlogProfilePage from '../../components/BlogProfilePage/BlogProfilePage';
import { useParams } from 'react-router-dom';
import { getallDataInLine, GetDtaFromUserUid_DB } from '../../configs/FirebaseMethod';

function PostUserProfile() {
  const { id } = useParams();
  const [userProfile, setuserProfile] = useState(null);
  const [Userblogs, setUserblogs] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for data

  useEffect(() => {
    async function getdt() {
      try {
        const userProfileDT = await GetDtaFromUserUid_DB(id, 'users');
        const Userblogdt = await getallDataInLine(id, 'blogs');
        setUserblogs(Userblogdt.arr);
        setuserProfile(userProfileDT.userData);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    }

    getdt();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* Skeleton Loader */}
        <div className="w-96 bg-white shadow-lg p-4 rounded-lg">
          <div className="h-32 bg-gray-200 animate-pulse"></div>
          <div className="flex justify-center -mt-16">
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center mt-4">
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/3 mx-auto mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  return <BlogProfilePage blogs={Userblogs} profile={userProfile} />;
}

export default PostUserProfile;
