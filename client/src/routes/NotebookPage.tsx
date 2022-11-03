import { Row } from '../components/common/Flexbox';
import { Notebook } from '../components/notebook/Notebook';

export const NotebookPage = () => {
  return(
      <Row height='100vh' width='100%' horizontal='center'>
        <Notebook />
      </Row>
    );
}