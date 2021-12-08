import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import palette from '../../lib/styles/palette';
import AuthForm from '../auth/AuthForm';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

const dataLists = [
  {value : 1, name : "Div. 1"},
  {value : 2, name : "Div. 2"},
  {value : 3, name : "Div. 3"},
  {value : 4, name : "Div. 4"},
]

const SelectBox = (props) => {
  return (
    <Select
    onChange={props.onChange}
    name={props.name}
    value={props.value}>
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultValue={props.defaultValue === option.value}
        >
          {option.name}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  margin: 1;
  min-width: 100px;
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

const DivInputForm = ({ onChange, profile, onInitTest}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <form>
            <div> Div. 1과 Div. 2는 6문제, Div. 3과 Div. 4는 7문제가 주어집니다.  </div>
            <div> Div. 1이 제일 어려운 난이도, Div. 4가 제일 쉬운 난이도입니다. </div>
          </form>
          <form>
            <SelectBox
              options={dataLists}
              name="testInfo.div"
              onChange={onChange}
              value={profile.testInfo.div}
            >
            </SelectBox>
            <Button
            className={classes.button}
            onClick={onInitTest}
            variant="outlined"
            type="submit"
            color="primary"
            >
            테스트 시작하기
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>

  )
};

export default DivInputForm;
