// @/interfaces/IHeaderProps.ts
import { PlayState } from '@/types/PlayStateType';

export interface IHeaderProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSearchClick: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
  onSaveMLClick?: () => void;
}

export interface IButtonGroupProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSaveClick: () => void;
  onLoadClick: () => void;
  onSaveMLClick?: () => void;
}

export interface IButtonProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  isSmall: boolean;
}

export interface IDocButtonProps {
  onClick: () => void;
  isSmall: boolean;
}
