export type RoundStatus = 'pending' | 'current' | 'completed'

export interface RaceRound {
  roundNumber: number
  distance: number
  status?: RoundStatus
  horses: {
    position: number
    name: string
  }[]
}

// Dummy data - 6 rounds
export const dummyRaceSchedule: RaceRound[] = [
  {
    roundNumber: 1,
    distance: 1200,
    status: 'completed',
    horses: [
      { position: 1, name: 'Thunder' },
      { position: 2, name: 'Lightning' },
      { position: 3, name: 'Storm' },
      { position: 4, name: 'Blaze' },
      { position: 5, name: 'Shadow' },
      { position: 6, name: 'Phoenix' },
      { position: 7, name: 'Ace' },
      { position: 8, name: 'Duke' },
      { position: 9, name: 'King' },
      { position: 10, name: 'Prince' }
    ]
  },
  {
    roundNumber: 2,
    distance: 1400,
    status: 'completed',
    horses: [
      { position: 1, name: 'Champion' },
      { position: 2, name: 'Victory' },
      { position: 3, name: 'Legend' },
      { position: 4, name: 'Hero' },
      { position: 5, name: 'Warrior' },
      { position: 6, name: 'Stallion' },
      { position: 7, name: 'Mustang' },
      { position: 8, name: 'Spirit' },
      { position: 9, name: 'Freedom' },
      { position: 10, name: 'Wildfire' }
    ]
  },
  {
    roundNumber: 3,
    distance: 1600,
    status: 'current',
    horses: [
      { position: 1, name: 'Thunder' },
      { position: 2, name: 'Champion' },
      { position: 3, name: 'King' },
      { position: 4, name: 'Spirit' },
      { position: 5, name: 'Legend' },
      { position: 6, name: 'Phoenix' },
      { position: 7, name: 'Victory' },
      { position: 8, name: 'Blaze' },
      { position: 9, name: 'Ace' },
      { position: 10, name: 'Duke' }
    ]
  },
  {
    roundNumber: 4,
    distance: 1800,
    status: 'pending',
    horses: [
      { position: 1, name: 'Lightning' },
      { position: 2, name: 'Storm' },
      { position: 3, name: 'Shadow' },
      { position: 4, name: 'Hero' },
      { position: 5, name: 'Warrior' },
      { position: 6, name: 'Stallion' },
      { position: 7, name: 'Mustang' },
      { position: 8, name: 'Freedom' },
      { position: 9, name: 'Wildfire' },
      { position: 10, name: 'Prince' }
    ]
  },
  {
    roundNumber: 5,
    distance: 2000,
    status: 'pending',
    horses: [
      { position: 1, name: 'Thunder' },
      { position: 2, name: 'Lightning' },
      { position: 3, name: 'Champion' },
      { position: 4, name: 'King' },
      { position: 5, name: 'Spirit' },
      { position: 6, name: 'Legend' },
      { position: 7, name: 'Phoenix' },
      { position: 8, name: 'Victory' },
      { position: 9, name: 'Blaze' },
      { position: 10, name: 'Ace' }
    ]
  },
  {
    roundNumber: 6,
    distance: 2200,
    status: 'pending',
    horses: [
      { position: 1, name: 'Storm' },
      { position: 2, name: 'Shadow' },
      { position: 3, name: 'Hero' },
      { position: 4, name: 'Warrior' },
      { position: 5, name: 'Stallion' },
      { position: 6, name: 'Mustang' },
      { position: 7, name: 'Freedom' },
      { position: 8, name: 'Wildfire' },
      { position: 9, name: 'Duke' },
      { position: 10, name: 'Prince' }
    ]
  }
]

// Dummy results data (same structure for now)
export const dummyRaceResults: RaceRound[] = [
  {
    roundNumber: 1,
    distance: 1200,
    status: 'completed',
    horses: [
      { position: 1, name: 'Thunder' },
      { position: 2, name: 'Lightning' },
      { position: 3, name: 'Storm' },
      { position: 4, name: 'Blaze' },
      { position: 5, name: 'Shadow' }
    ]
  },
  {
    roundNumber: 2,
    distance: 1400,
    horses: [
      { position: 1, name: 'Champion' },
      { position: 2, name: 'Victory' },
      { position: 3, name: 'Legend' },
      { position: 4, name: 'Hero' },
      { position: 5, name: 'Warrior' }
    ]
  }
]

