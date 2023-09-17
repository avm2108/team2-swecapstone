export const getTripStatus = ({
  isProviderAccepted = 0,
  isProviderStatus = 0,
}) => {
  switch (isProviderAccepted) {
    case 1:
      if (isProviderStatus === 1 || isProviderStatus === 0) {
        console.log(
          '🚀 ~ file: getTripStatus.ts:8 ~ isProviderStatus:',
          isProviderStatus,
        );
        return 'Accepted';
      }
      console.log('🚀 ~ file: getTripStatus.ts:12 ~ Waiting:');
      return 'Waiting';
    case 2:
      return 'Coming';
    case 0:
    case 3:
      return 'Waiting';
    case 4:
      return 'Arrived';
    case 6:
      return 'Started';
    case 9:
      return 'Completed';
    default:
      console.log('🚀 ~ file: getTripStatus.ts:28 ~ default:');
      return 'Waiting';
  }
};
