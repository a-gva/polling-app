import CreatePoll from '@/components/create-poll';
import SuccessVote from '@/components/success-vote';
import SocketProvider from '@/socket/provider';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-row items-center justify-between xs:p-12 md:p-24'>
      <div className='z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        <CreatePoll />
        <SocketProvider>
          <SuccessVote />
        </SocketProvider>
        {/* <WelcomeScreen />
        <VoteCTA />
        <Login />
        <VotingCabin content={beatles} /> */}
      </div>
    </main>
  );
}
