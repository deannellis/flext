export const workoutData = {
    workout: { bench: 2, row: 2, squat: 2 },
    currentWeight: {
        bench: 79,
        row: 110,
        squat: 164,
        deadlift: 106,
        overhead: 107,
        chinup: { ups: 3, negatives: 2, weight: 0 },
    },
    created: 1000
};

export const storedWorkout = {
    bench: { weight: 79, result: 2 },
    row: { weight: 110, result: 2 },
    squat: { weight: 164, result: 2 },
    created: 1000
}

export const weights = {
    bench: 85,
    row: 115,
    squat: 156,
    deadlift: 106,
    overhead: 112,
    chinup: { ups: 3, negatives: 2, weight: 0 }
}

export const workouts = [
    {
        overhead: {
          weight: 112,
          result: 2
        },
        chinup: {
          weight: {
            ups: 4,
            negatives: 1,
            weight: 0
          },
          result: 1
        },
        squat: {
          weight: 156.6,
          result: 2
        },
        created: '1969-12-08T18:28:12.461Z',
        id: '1d8ad17a-c62a-4182-8ddb-0df62af33c65'
      },
      {
        bench: {
          weight: 85,
          result: 2
        },
        row: {
          weight: 115.5,
          result: 2
        },
        deadlift: {
          weight: 106,
          result: 1
        },
        created: '2020-02-06T18:41:49.124Z',
        id: '7a07e348-e0e8-48c8-a60a-3d9fb9929ab5'
      },
      {
        overhead: {
          weight: 107,
          result: 2
        },
        chinup: {
          weight: {
            ups: 3,
            negatives: 2,
            weight: 0
          },
          result: 0
        },
        squat: {
          weight: 174,
          result: 0
        },
        created: '2020-02-03T21:01:59.832Z',
        id: 'de5f7586-8023-4b3a-bfcf-0ff72fe2c4d8'
      },
];
