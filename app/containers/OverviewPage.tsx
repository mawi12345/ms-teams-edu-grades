import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Overview from '../components/Overview';
import { appStateType } from '../reducers/types';
import { push } from 'connected-react-router';

function mapStateToProps(state: appStateType) {
  const headerRow = Object.values(state.home.raw[0]) as string[];

  const count = Math.round((headerRow.length - 3) / 3)
  let sum = 0;

  const todos = [];
  for (let x = 0; x < count; x++) {
    todos.push({
      name: headerRow[3 + (x*3)],
      max: 0,
    })
  }

  const students = [];
  for (let i = 1; i < state.home.raw.length; i++) {
    const studentRow = Object.values(state.home.raw[i]) as string[];

    if (i === 1) {
      for (let x = 0; x < count; x++) {
        const max = parseInt(studentRow[4 + (x*3)])
        if (max && !isNaN(max)) {
          todos[x].max = max
          sum += max
        }
      }
    }

    const results = [];
    for (let x = 0; x < count; x++) {
      results.push(parseInt(studentRow[3 + (x*3)]))
    }

    students.push({
      first: studentRow[0],
      last: studentRow[1],
      results,
    })

  }

  students.sort((a, b) => {
    var nameA = a.last.toUpperCase();
    var nameB = b.last.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })

  return {
    data: {
      todos,
      students,
      sum
    },
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      push
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
