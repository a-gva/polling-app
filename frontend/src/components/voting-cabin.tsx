import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BeatlesSpecs } from '@/data/beatles';

export interface VotingCabinProps {
  content: BeatlesSpecs[];
}

export default function VotingCabin({ content }: VotingCabinProps) {
  return (
    <div>
      {content.map((beatle, index) => (
        <div key={index}>
          <Card>
            <CardHeader>
              <CardTitle>{beatle.name}</CardTitle>
              <CardDescription>{beatle.instrument.main}</CardDescription>
            </CardHeader>
            {beatle.instrument.secondary.map((instrument, index) => (
              <CardContent key={index}>
                <p>{instrument}</p>
              </CardContent>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}
