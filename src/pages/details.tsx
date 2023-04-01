import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["details-job"], () => {
    return axios.get(`/api/v1/job/details/${id}`);
  });

  return (
    <div className='p-4'>
      <button onClick={() => navigate(-1)}>back</button>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className='p-4 mt-4 border-2 border-gray-500 h-full'>
          <p className='text-gray-400'>
            {data?.data?.data?.location} / <span>{data?.data?.data?.type}</span>
          </p>
          <h2 className='text-2xl text-green-800 mb-6'>
            {data?.data?.data?.title}
          </h2>
          <hr />
          <div className='flex gap-8 mt-4'>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.data?.data?.description,
              }}
            />
            <div className='flex flex-col w-full gap-4'>
              <div className='h-64 w-full border border-gray-400 text-center overflow-auto'>
                <img
                  src={data?.data?.data?.company_logo}
                  alt='company_logo'
                  className='w-full h-[calc(100%-2rem)]'
                />
                <a
                  href={data?.data?.data?.company_url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {data?.data?.data?.company_url}
                </a>
              </div>
              <div className='h-64 w-full border border-gray-400 bg-yellow-200/40 px-2'>
                <h3 className='py-2'>How to apply</h3>
                <hr />
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.data?.how_to_apply,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
