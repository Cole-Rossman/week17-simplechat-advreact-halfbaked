export const emojis = [
  '😄',
  '😐',
  '😞',
  '🥲',
  '😎',
  '🥳',
  '🐶',
  '🐱',
  '🐵',
  '🦁',
  '🐯',
  '🐻‍❄️',
  '🥥',
  '🍍',
  '🌭',
  '🍕',
  '🥞',
  '🧇',
];

export function statusToEmoji(status) {
  return emojis[status];
}

export function emojiToStatus(emoji) {
  return emojis.reduce((acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {})[emoji];
}
