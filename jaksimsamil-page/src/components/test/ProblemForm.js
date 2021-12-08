import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import palette from '../../lib/styles/palette';
import AuthForm from '../auth/AuthForm';
import Button from '@material-ui/core/Button';

const numToAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: palette.gray[2],
    padding: theme.spacing(8),
  },
  problem: {
    padding: theme.spacing(0.2),
    paddingLeft: theme.spacing(4),
    margin: 'auto',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    textAlign: 'left',
    display: 'auto',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 'auto',
    paddingLeft: 'auto',
    display: 'flex',
  },
  text: {
    margin: theme.spacing(1),
  },
}));

const SingleProblemForm = ({problemOrder, problemInfo}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.problem}>
      <a href={"https://www.acmicpc.net/problem/" + problemInfo.problem_number} target="_blank"><h3>{numToAlphabet[problemOrder]}. {problemInfo.problem_title}</h3></a>
    </Paper>
  )
}

const TestProblemForm = ({ profile, onChange, onUpdateTest, onGiveupTest, }) => {
  const classes = useStyles();
  let i = 0
  return (
  <div>
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <form>
            <div> 난이도: Div. {profile.testInfo.div}  </div>
            <div> 타이머 기능은 구현되지 않았습니다. 제한시간 없이 편하게 푸세요. </div>
          </form>
          <form>
            <Button
            className={classes.button}
            onClick={onGiveupTest}
            variant="outlined"
            type="submit"
            color="secondary"
          >
            테스트 그만두기
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <SingleProblemForm problemOrder={0} problemInfo={profile.testInfo.testProblemData[0]} />
        <SingleProblemForm problemOrder={1} problemInfo={profile.testInfo.testProblemData[1]} />
        <SingleProblemForm problemOrder={2} problemInfo={profile.testInfo.testProblemData[2]} />
        <SingleProblemForm problemOrder={3} problemInfo={profile.testInfo.testProblemData[3]} />
        <SingleProblemForm problemOrder={4} problemInfo={profile.testInfo.testProblemData[4]} />
        <SingleProblemForm problemOrder={5} problemInfo={profile.testInfo.testProblemData[5]} />
        {profile.testInfo.testProblemData.length === 7 ? (
          <SingleProblemForm problemOrder={6} problemInfo={profile.testInfo.testProblemData[6]} />
        ) : (<h4></h4>)}
      </Grid>
    </Grid>
  </div>
)};

export default TestProblemForm;
