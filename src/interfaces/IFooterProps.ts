// @/interfaces/IFooterProps.ts
import { PlayState } from '@/types/PlayStateType';

export interface IFooterProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSearchClick: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
}

export interface IButtonGroupProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSaveClick: () => void;
  onLoadClick: () => void;
}
  
export interface IButtonProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
}
  
export interface IDocButtonProps {
  onClick: () => void;
}
