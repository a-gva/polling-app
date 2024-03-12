import WelcomeScreen from '@/components/welcome-screen';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-row items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <WelcomeScreen />
      </div>
    </main>
  );
}
