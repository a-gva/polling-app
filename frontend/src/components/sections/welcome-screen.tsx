export default function WelcomeScreen() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-3xl'>Create Your Poll App</h1>
        <p>
          It only takes a few seconds. Create your poll and share it with your
          friends.
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='font-bold'>How it works</h2>
        <ul>
          <li>Vote for any poll</li>
          <li>See the results in real-time</li>
        </ul>
      </div>
    </div>
  );
}
