import React, {useCallback}  from 'react';
// import { Link } from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
// import routes from '../constants/routes.json';
import styles from './Home.css';

import csv from 'csv-parser';

type Props = {
  readCSV: (data: object[]) => void;
  push: (path: string) => void;
  home: any;
};

export default function Home(props: Props) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const [file] = acceptedFiles;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
    // Do whatever you want with the file contents
      const parser = csv({separator: ',', headers: false});
      const results: object[] = [];
      parser.on('data', (data) => results.push(data))
      parser.on('end', () => {
        props.readCSV(results)
        props.push('/overview')
      });
      parser.write(reader.result)
      parser.end()
    }
    reader.readAsText(file)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false})

  return (
    <div className={styles.container} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Teams export hier ablegen ...</p> :
          <p>Teams export hier hinziehen oder anklicken zum Auswählen.</p>
      }
    </div>
  );
}
