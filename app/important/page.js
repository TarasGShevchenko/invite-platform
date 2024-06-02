'use client';
import React from 'react';

import { useGlobalState } from '../context/GlobalProvider';
import { Invites } from '../components/Invites';

export default function page() {
  const { importantInvites } = useGlobalState();

  return <Invites title={'Important Invites'} invites={importantInvites} />;
}
