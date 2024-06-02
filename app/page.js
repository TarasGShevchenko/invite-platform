'use client';
import { Invites } from './components/Invites';
import { useGlobalState } from './context/GlobalProvider';

export default function Home() {
  const { invites } = useGlobalState();
  return <Invites title="All invites" invites={invites} />;
}
