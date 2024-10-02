import { memo } from 'react';

export const SlowClient = memo(({ text }) => {
  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return <ul style={{ listStyle:"none"}}>{items}</ul>;
});

const SlowItem = ({ text }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li>Text: {text}</li>;
};

export default SlowClient;