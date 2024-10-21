'use client';

// import App from './layouts/index';
import { Button } from 'tdesign-react/lib/';
import 'tdesign-react/es/style/index.css';
import './styles/index.css';

export default function indexPage() {
  return (
    <>
      <Button shape='rectangle' size='medium' type='button' variant='base'>
        确定
      </Button>
    </>
  );
  // return <App />;
}
