import cronstrue from 'cronstrue';

export type CronExample = {
  name: string;
  cron: string;
  readable?: string;
}

const examplesArray: CronExample[] = [
  {
    name: 'Every minute',
    cron: '* * * * *'
  },
  {
    name: 'Every even minute',
    cron: '*/2 * * * *'
  },
  {
    name: 'Every 15 minutes',
    cron: '*/15 * * * *'
  },
  {
    name: 'Every hour at 30 minutes',
    cron: '30 * * * *'
  },
  {
    name: 'Every Friday at midnight',
    cron: '0 0 * * FRI'
  },
  {
    name: 'Monday to Friday',
    cron: '0 0 * * 1-5'
  },
  {
    name: 'Every hour from 9 am  to 5 pm',
    cron: '0 9-17 * * *'
  },
  {
    name: 'Weekly',
    cron: '0 0 * * 0'
  },
  {
    name: 'Twice a day',
    cron: '0 5,17 * * *'
  },
  {
    name: 'Only in selected months',
    cron: '* * * jan,may,aug *'
  }
];

const cronExamples: CronExample[] = examplesArray.map((value: CronExample) => {
  let readable = '';

  try {
    readable = cronstrue.toString(value.cron);
  } catch(e) {
    console.error(`An error occurred when trying to parse cron ${value.cron}:`, e);
    readable = 'Invalid cron!'
  }

  return {...value, readable}
});

export default cronExamples;