export interface BeatlesSpecs {
  name: string;
  instrument: {
    main: string;
    secondary: string[];
  };
}

export const beatles: BeatlesSpecs[] = [
  {
    name: 'John Lennon',
    instrument: { main: 'Guitar', secondary: ['Piano', 'Vocals'] },
  },
  {
    name: 'Paul McCartney',
    instrument: { main: 'Bass', secondary: ['Guitar', 'Piano', 'Vocals'] },
  },
  {
    name: 'George Harrison',
    instrument: { main: 'Guitar', secondary: ['Vocals'] },
  },
  {
    name: 'Ringo Starr',
    instrument: { main: 'Drums', secondary: ['Percussion', 'Vocals'] },
  },
];
