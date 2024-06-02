'use client';
import React from 'react';
import styled from 'styled-components';

import { useGlobalState } from '@/app/context/GlobalProvider';

const AppStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 100%;
  transition: all 0.3s ease-in-out;

  background-color: ${props => props.theme.colorBg};

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

export const AppStyleProvider = ({ children }) => {
  const { theme } = useGlobalState();
  return <AppStyles theme={theme}>{children}</AppStyles>;
};
