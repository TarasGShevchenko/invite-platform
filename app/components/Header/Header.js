'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useGlobalState } from '@/app/context/GlobalProvider';
import menu from '@/app/utils/menu';

const HeaderStyled = styled.nav`
  position: relative;
  color: ${props => props.theme.colorTextLight};
  background-color: ${props => props.theme.colorBg2};
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 1rem;

  display: flex;
  justify-content: space-between;

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${props => props.theme.colorBg};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${props => props.theme.borderColor};

      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${props => props.theme.borderColor};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-items {
    display: flex;
    margin: 1.3rem;
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1.3rem 0.9rem 1.3rem;
    margin: 1.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::before {
      position: absolute;
      content: '';
      right: 0;
      bottom: 0;
      width: 100%;
      height: 0%;
      background-color: ${props => props.theme.colorGreenDark};
      border-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
    }

    &:hover {
      &::after {
        height: 100%;
      }
    }
  }

  .active {
    background-color: ${props => props.theme.activeNavLink};
  }

  .active::before {
    height: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    .profile {
      flex-direction: column;
      justify-content: space-evenly;
    }
    .nav-items {
      display: block;
      margin: 1.3rem;
    }
  }
`;

export const Header = () => {
  const { theme } = useGlobalState();

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = link => {
    router.push(link);
  };
  return (
    <HeaderStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            width={70}
            height={70}
            src={'/stock.png'}
            alt="profile"
            priority
          />
        </div>
        <h1 className="capitalize">Admin Admin</h1>
      </div>
      <ul className="nav-items">
        {menu.map(item => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? 'active' : ''}`}
              onClick={() => {
                handleClick(link);
              }}>
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </HeaderStyled>
  );
};
