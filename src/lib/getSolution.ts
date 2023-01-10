import { solutionsList } from '../static/solutionsList';
import { daysSinceStart } from './dateHelpers';

// Get today's answer
export const getSolution = () => solutionsList[daysSinceStart].toUpperCase();
// export const answer = 'ALLOW';
