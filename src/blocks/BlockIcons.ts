// @/blocks/BlockIcons.ts
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
import GridOnIcon from '@mui/icons-material/GridOn';
import ApiIcon from '@mui/icons-material/Api';

interface IBlockIconMap {
  [key: string]: string | React.ElementType;
}

export const BlockIcons : IBlockIconMap = {
  xrpl: '/icons/xrpl-logo.svg',
  xaman: '/icons/xaman-logo.jpg',
  text: TextFieldsIcon,
  math: CalculateIcon,
  control: TuneIcon,
  time: AlarmOnIcon,
  json: DataObjectIcon,
  table: GridOnIcon,
  animation: AnimationIcon,
  logic: ShuffleIcon,
  loop: RefreshIcon,
  list: ListIcon,
  webapi: ApiIcon,
  supabase: '/icons/supabase-logo.svg',
  variable: InputIcon,
  function: WidgetsIcon,
};
