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
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
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

const Header = ({ user, profile, onLogout, category, onSelect }) => {
  let CurrTierInfo = TierInfo(profile.userTier);
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
            className="right"
          />
          {user ? (
            <div className="right">
              <UserInfo>{profile.username}</UserInfo>
              <CurrTierInfo>{tierNumToString[profile.userTier]}</CurrTierInfo>
              <CurrTierInfo>{profile.userRating}</CurrTierInfo>
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
    </>
  );
};

export default Header;
