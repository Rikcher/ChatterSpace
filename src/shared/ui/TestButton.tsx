'use client'; // This makes it a Client Component

import { useState } from 'react';
import { signInWithDiscord } from '@app/actions';

const TestButton = () => {
  return <button onClick={signInWithDiscord}>sigup with discord</button>;
};

export default TestButton;
