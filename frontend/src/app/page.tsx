import Login from '@/components/login';
import VoteCTA from '@/components/vote-cta';
import VotingCabin from '@/components/voting-cabin';
import WelcomeScreen from '@/components/welcome-screen';
import { beatles } from '@/data/beatles';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-row items-center justify-between p-24'>
      <div className='z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        <WelcomeScreen />
        <VoteCTA />
        <Login />
        <VotingCabin content={beatles} />
      </div>
    </main>
  );
}
