import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import Categories from './Categories';

const tierNumToString =
["Unrated",
"Bronze V", "Bronze IV", "Bronze III", "Bronze II", "Bronze I",
"Silver V", "Silver IV", "Silver III", "Silver II", "Silver I",
"Gold V", "Gold IV", "Gold III", "Gold II", "Gold I",
"Platinum V", "Platinum IV", "Platinum III", "Platinum II", "Platinum I",
"Diamond V", "Diamond IV", "Diamond III", "Diamond II", "Diamond I",
"Ruby V", "Ruby IV", "Ruby III", "Ruby II", "Ruby I",
"Master"]

const tierColor = ["#111111", "#9b4e00", "#3d556d", "#df9200", "#1dd89b", "#00b4fc", "#ee0027", "#9460f4"]

const HeaderBlock = styled.div`
  position: fixed;
  align-items: center;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  justify-content: space-between;
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;

  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: right;
    
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;
const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const TierInfo = (userTier) => 
{
  return styled.div`
  font-weight: 700;
  margin-right: 1rem;
  color: ${tierColor[Math.floor((userTier + 4) / 5)]};
`;
};

var curTier = 0, curRating = 0, curUser = "", CurTierInfo = TierInfo(curTier);

const Header = ({ user, profile, onLogout, category, onSelect }) => {
  if (curUser !== profile.username)
  {
    curUser = profile.username;
  }
  if (curTier !== profile.userTier)
  {
    curTier = profile.userTier;
    CurTierInfo = TierInfo(curTier);
  }
  if (curRating !== profile.userRating)
  {
    curRating = profile.userRating;
  }
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            작심삼일
          </Link>
          <Categories
            category={category}
            onSelect={onSelect}
            className="logo"
          />

          {user ? (
            <div className="right">
              <UserInfo>{curUser}</UserInfo>
              { curTier != -1 ? (
                <><CurTierInfo>{tierNumToString[curTier]}</CurTierInfo><CurTierInfo>{curRating}</CurTierInfo></>
              ) : (
                <><CurTierInfo>solved.ac 연동 에러</CurTierInfo></>
              )
              }
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}

        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </ >
  );
};

export default Header;
