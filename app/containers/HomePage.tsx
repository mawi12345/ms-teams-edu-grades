import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  readCSV
} from '../actions/home';
import { appStateType } from '../reducers/types';
import { push } from 'connected-react-router';

function mapStateToProps(state: appStateType) {
  return {
    home: state.home
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      readCSV,
      push
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
