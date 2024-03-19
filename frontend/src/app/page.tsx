import CreatePoll from '@/components/sections/create-poll';
import PollsCards from '@/components/sections/polls-cards';
import WelcomeScreen from '@/components/sections/welcome-screen';
import { Toaster } from '@/components/ui/toaster';
import SocketProvider from '@/socket/provider';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-row items-center justify-between xs:p-12 md:p-24'>
      <div className='flex gap-12 z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='flex flex-row gap-12 w-full '>
          <div className='w-1/3  '>
            <WelcomeScreen />
          </div>
          <div className='w-full '>
            <CreatePoll />
          </div>
        </div>
        <div>
          <SocketProvider>
            <PollsCards />
          </SocketProvider>
        </div>
        <Toaster />
      </div>
    </main>
  );
}
