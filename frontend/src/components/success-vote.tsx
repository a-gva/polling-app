import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SuccessVote() {
  return (
    <>
      <div className='flex flex-col items-center'>
        <CheckCircleIcon style={{ fontSize: '10rem', color: 'green' }} />
        <span>Your vote was succesfully computed!</span>
      </div>
      <div>
        Check realtime results in <a href=''>link</a>
      </div>
    </>
  );
}
