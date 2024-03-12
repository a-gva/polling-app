export default function WelcomeScreen() {
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold'>Welcome to the Ultimate Beatle Poll!</h1>
      <p>
        Join us in settling the age-old debate: Who is the greatest Beatle of
        all time? Cast your vote and let your voice be heard in this legendary
        battle of musical titans.
      </p>
      <h2 className='font-bold'>How it works</h2>
      <ul>
        <li>Vote for your favorite Beatle</li>
        <li>See the results in real-time</li>
      </ul>
    </div>
  );
}
