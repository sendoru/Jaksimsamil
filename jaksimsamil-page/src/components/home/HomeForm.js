import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import palette from '../../lib/styles/palette';
import AuthForm from '../auth/AuthForm';
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
}));
const HomeForm = ({ PSdata, goalNum }) => {
  const classes = useStyles();
  return PSdata ? (
    <div className={classes.root}>
      <Grid container spacing={5}>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>{PSdata.recommend_data[0].problem_number}</h1>
            <h1>{PSdata.recommend_data[0].problem_title}</h1>
            <a
              href={'http://www.boj.kr/' + PSdata.recommend_data[0].problem_number}
            >
              바로가기
            </a>

            <h3>오늘의 추천 문제 (Easy)</h3>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>{PSdata.recommend_data[1].problem_number}</h1>
            <h1>{PSdata.recommend_data[1].problem_title}</h1>
            <a
              href={'http://www.boj.kr/' + PSdata.recommend_data[1].problem_number}
            >
              바로가기
            </a>

            <h3>오늘의 추천 문제 (Normal)</h3>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>{PSdata.recommend_data[2].problem_number}</h1>
            <h1>{PSdata.recommend_data[2].problem_title}</h1>
            <a
              href={'http://www.boj.kr/' + PSdata.recommend_data[2].problem_number}
            >
              바로가기
            </a>

            <h3>오늘의 추천 문제 (Hard)</h3>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h1>{PSdata.presentNum + '/' + goalNum}</h1>
            <h3>오늘 푼 문제</h3>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h1>{PSdata.latestSolve.problem_number}</h1>
            <h1>{PSdata.latestSolve.problem_title}</h1>
            <h3>마지막으로 푼 문제</h3>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>{PSdata.weekNum}</h1>
            <h3>7일</h3>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>{PSdata.monthNum}</h1>
            <h3>30일</h3>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>{PSdata.totalNum}</h1>
            <h3>전체</h3>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1></h1>
            <h3>오늘의 추천 문제</h3>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h1></h1>
            <h3>오늘</h3>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h1></h1>
            <h3>마지막 날</h3>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1></h1>
            <h3>7일</h3>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1></h1>
            <h3>30일</h3>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1></h1>
            <h3>전체</h3>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeForm;
