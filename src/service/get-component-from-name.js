import componentIndex from '../components-catalog';
import {find} from 'lodash/collection';
export default function(componentName){
    return find(componentIndex, (comp)=>{
        return comp.name === componentName;
    });
}
