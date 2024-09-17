import {registerSheet} from 'react-native-actions-sheet';
import Menu from './Menu';
import Select from './Select';
import PostComment from './PostComment';
import PostReaction from './PostReaction';
import CustomView from './CustomView';

registerSheet('menu', Menu);
registerSheet('select', Select);
registerSheet('PostComment', PostComment);
registerSheet('PostReaction', PostReaction);
registerSheet('view', CustomView);

export {};
