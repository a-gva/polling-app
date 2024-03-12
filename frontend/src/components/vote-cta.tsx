import { Button } from '@/components/ui/button';

export default function VoteCTA() {
  return (
    <div className='flex flex-col w-full'>
      <h2>
        It only takes a few seconds. Just enter your name and you&apos;ll be
        ready to go!
      </h2>
      <Button className='w-fit'>Vote Now</Button>
    </div>
  );
}
