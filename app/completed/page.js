'use client';
import React from 'react';

import { useGlobalState } from '../context/GlobalProvider';
import { Invites } from '../components/Invites';

export default function page() {
  const { completedInvites } = useGlobalState();

  return <Invites title={'Completed Invites'} invites={completedInvites} />;
}
