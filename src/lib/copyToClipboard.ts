import { Evaluations } from '../hooks/useKeyboard';

export async function copyToClipboard({
  evaluations,
}: {
  evaluations: Evaluations;
}) {
  console.log('copyToClipboard: ', evaluations);
}
