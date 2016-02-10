import { curry, Inline} from 'jsxstyle';
import L from '../LayoutConstants';

const PrimaryText = curry(Inline, { fontSize: '2rem', fontWeight: 'bold', color: L.white });

export default PrimaryText;
