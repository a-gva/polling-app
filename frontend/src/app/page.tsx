import CreatePoll from '@/components/sections/create-poll';
import DisplayCards from '@/components/sections/display-cards';
import WelcomeScreen from '@/components/sections/welcome-screen';
import { Toaster } from '@/components/ui/toaster';
import SocketProvider from '@/socket/provider';

export default function Home() {
  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center justify-between xs:p-12 md:p-16'>
      <div className='flex gap-16 md:gap-16 z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='flex flex-col lg:flex-row gap-12 w-full'>
          <div className='lg:w-1/3'>
            <WelcomeScreen />
          </div>
          <div className='w-full self-end'>
            <CreatePoll />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-12 w-full '>
          <SocketProvider>
            <DisplayCards />
          </SocketProvider>
        </div>
        <Toaster />
      </div>
    </main>
  );
}
