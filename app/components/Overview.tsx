import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Overview.css';
import routes from '../constants/routes.json';

type Props = {
  data: {
    todos: any[],
    students: any[],
    sum: number;
  };
};

const saveNumber = (a: number) => {
  if (a && !isNaN(a)) {
    return a
  }
  return 0;
}

const getPercentStyle = (p: number) => {
  let percent = 0;
  if (p && !isNaN(p)) {
    percent = Math.round(p / 20) * 20;
  }
  let percentStyle = '';
  if (percent >= 100) {
    percentStyle = styles.point100;
  } else if (percent === 80) {
    percentStyle = styles.point80;
  } else if (percent === 60) {
    percentStyle = styles.point60;
  } else if (percent === 40) {
    percentStyle = styles.point40;
  } else if (percent === 20) {
    percentStyle = styles.point20;
  } else if (percent === 0) {
    percentStyle = styles.point0;
  }
  return percentStyle
}

export default function Overview(props: Props) {
  const {
    data
  } = props;

  return (
    <>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={styles.printButton} onClick={() => window.print()}><i className="fa fa-print fa-3x" /></div>
      <div className={styles.container}>
        <div className={styles.rowheader}>
          <div className={styles.spacer} />
          <div className={`${styles.todo} ${styles.todoSum}`}>Summe in % von {data.sum} Punkte</div>
          {data.todos.map(t => (<div className={styles.todo}>{t.name}</div>))}
        </div>
        {data.students.map((s) => { 
          const sumPercent = Math.round(s.results.reduce((a: number, b: number) => saveNumber(a) + saveNumber(b), 0) * 100 / data.sum);
          return (
            <div className={styles.row}>
              <div className={styles.name}>{s.first} {s.last}</div>
              <div className={`${styles.point} ${getPercentStyle(sumPercent)} ${styles.pointSum}`}>{sumPercent}</div>
              {s.results.map((r: number, index: number) => {
                let percent = 0;
                if (r && !isNaN(r) && data.todos[index].max) {
                  percent = Math.round((r * 100 / data.todos[index].max));
                }

                return <div className={`${styles.point} ${getPercentStyle(percent)}`}>{isNaN(r) ? '-' : r}</div>
              })}
            </div>
          )
        })}
      </div>
      
    </>
  );
}
