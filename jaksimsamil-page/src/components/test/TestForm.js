import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import palette from '../../lib/styles/palette';
import AuthForm from '../auth/AuthForm';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";
import DivInputForm from './DivInputForm';
import ProblemForm from './ProblemForm'

const dataLists = [
  {value : 1, name : "Div. 1"},
  {value : 2, name : "Div. 2"},
  {value : 3, name : "Div. 3"},
  {value : 4, name : "Div. 4"},
]

const Select = styled.select`
  margin: 1;
  min-width: 20;
  width: 20%;
  padding: 8px 8px;
  margin-top: 12px;
  margin-bottom: 6px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
`;


const LoadingParentStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: palette.gray[2],
    padding: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(8),
    margin: 'auto',
    textAlign: 'center',

    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(1),
  },
}));

const TestForm = ({ profile, onChange, onInitTest, onUpdateTest, onGiveupTest, isLoading }) => {
  const classes = useStyles();
  return (isLoading ? (
    <LoadingParentStyle>
    <CircularProgress className={classes.loading} />
    </LoadingParentStyle>  ) : (
      (!profile.testInfo.inProgress) ? (
      <div className={classes.root}>
        <DivInputForm
        profile={profile}
        onChange={onChange}
        onInitTest={onInitTest}
        />
      </div>
    ) : (
    <div className={classes.root}>
      <ProblemForm
      profile={profile}
      onChange={onChange}
      onUpdateTest={onUpdateTest}
      onGiveupTest={onGiveupTest}
      />
    </div>
    )
  )

)};

export default TestForm;
