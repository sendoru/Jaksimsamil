import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import palette from '../../lib/styles/palette';
import AuthForm from '../auth/AuthForm';
import Button from '@material-ui/core/Button';
import styled from "styled-components";

const dataLists = [
  {value : 1, name : "Div. 1"},
  {value : 2, name : "Div. 2"},
  {value : 3, name : "Div. 3"},
  {value : 4, name : "Div. 4"},
]

const SelectBox = (props) => {
  return (
    <Select>
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </Select>
  );
};

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

const TestForm = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form>
              <div> Div. 1과 Div. 2는 6문제, Div. 3과 Div. 4는 7문제가 주어집니다.  </div>
              <div> Div. 1이 제일 어려운 난이도, Div. 4가 제일 쉬운 난이도입니다. </div>
            </form>
            <form>
              <SelectBox options={dataLists}> </SelectBox>
            </form>
            <Button
            className={classes.button}
            // onClick={}
            variant="outlined"
            type="submit"
            color="primary"
          >
            테스트 시작하기
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
};

export default TestForm;
