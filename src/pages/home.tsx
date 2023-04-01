import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";

interface JobI {
  id: string;
  title: string;
  company: string;
  type: string;
  created_at: Date;
  location: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery(["job-list"], () => {
    return axios.get("/api/v1/job", {
      params: {
        description,
        location,
        full_time: fulltime,
        page,
      },
    });
  });

  const renderActions = (
    <div className='flex justify-between gap-8 items-center w-full p-4'>
      <div className='w-full'>
        <label htmlFor='job_description' className='block font-medium mb-1'>
          Job Description
        </label>
        <input
          id='job_description'
          className='p-2 w-full rounded-md border border-gray-300'
          name='job_description'
          placeholder='Filter by title, benefits, companies, expertise'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='w-full'>
        <label htmlFor='job_description' className='block font-medium mb-1'>
          Location
        </label>
        <input
          id='job_description'
          className='p-2 w-full rounded-md border border-gray-300'
          name='job_description'
          placeholder='Filter by city, state, zip code or country'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='w-full'>
        <input
          type='checkbox'
          id='vehicle1'
          name='vehicle1'
          checked={!!fulltime}
          onChange={(e) => setFulltime(e.target.checked)}
        />
        <label htmlFor='vehicle1' className='font-bold ml-2'>
          Full Time only
        </label>
      </div>
      <button
        className='border bg-slate-500 text-white px-6 py-2 rounded-md'
        onClick={() => refetch()}>
        Search
      </button>
    </div>
  );

  const renderContent = (
    <div className='border-2 border-gray-500 h-screen px-8'>
      <h2 className='text-2xl my-6'>Job List</h2>
      <hr />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data?.data.data.map((job: JobI) => (
            <div
              className='cursor-pointer'
              key={job?.id}
              onClick={() => navigate(`/job-details/${job?.id}`)}>
              <div className='flex justify-between py-4'>
                <div className='font-bold'>
                  <h3 className='text-blue-700'>{job?.title}</h3>
                  <p className='text-gray-400'>
                    {job?.company} -{" "}
                    <span className='text-green-400'>{job?.type}</span>
                  </p>
                </div>
                <div className='flex flex-col items-end'>
                  <h3>{job?.location}</h3>
                  <p className='text-gray-400'>
                    <ReactTimeAgo
                      date={job?.created_at || new Date()}
                      locale='en-US'
                    />
                  </p>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
  return (
    <div className='px-4 pb-4'>
      {renderActions}
      {renderContent}
      <button
        className='w-full p-4 bg-blue-400 rounded-md mt-4'
        onClick={() => setPage((prevState) => prevState + 1)}>
        More Jobs
      </button>
    </div>
  );
};

export default Home;
