import ShuffleIcon from '@mui/icons-material/Shuffle';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculateIcon from '@mui/icons-material/Calculate';
import AnimationIcon from '@mui/icons-material/Animation';
import ListIcon from '@mui/icons-material/List';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import TuneIcon from '@mui/icons-material/Tune';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InputIcon from '@mui/icons-material/Input';
import WidgetsIcon from '@mui/icons-material/Widgets';
import DataObjectIcon from '@mui/icons-material/DataObject';

interface BlockIconMap {
  [key: string]: string | React.ElementType;
}

export const BlockIcons : BlockIconMap = {
  xrpl: '/icons/xrpl-logo.svg',
  xaman: '/icons/xaman-logo.jpg',
  text: TextFieldsIcon,
  math: CalculateIcon,
  control: TuneIcon,
  time: AlarmOnIcon,
  json: DataObjectIcon,
  animation: AnimationIcon,
  logic: ShuffleIcon,
  loop: RefreshIcon,
  list: ListIcon,
  variable: InputIcon,
  function: WidgetsIcon,
};
