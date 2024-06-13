import React from 'react';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';

export type PlayState = 'start' | 'resume' | 'init' | 'cancel' | 'suspend';

interface ButtonGroupProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSaveClick: () => void;
  onLoadClick: () => void;
}

interface ButtonProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
}

interface DocButtonProps {
  onClick: () => void;
}

const iconClass = "h-6 w-6 text-gray-500";
const startClass = "h-6 w-6 text-teal-500";
const endClass = "h-6 w-6 text-red-500";

const StartButton = ({ playState, setPlayState }: ButtonProps) => {
  if (playState === 'start' || playState === 'resume') {
    return null;
  } else if (playState === 'init' || playState === 'cancel') {
    return (
      <div
        className="flex-1 flex items-center justify-center cursor-pointer h-full"
        onClick={() => setPlayState('start')}
      >
        <PlayIcon className={startClass} />
      </div>
    );
  }
  return (
    <div
      className="flex-1 flex items-center justify-center cursor-pointer h-full"
      onClick={() => setPlayState('resume')}
    >
      <PlayIcon className={startClass} />
    </div>
  );
};

const StopButton = ({ playState, setPlayState }: ButtonProps) => {
  if (playState === 'start' || playState === 'resume') {
    return (
      <div
        className="flex-1 flex items-center justify-center cursor-pointer h-full"
        onClick={() => setPlayState('suspend')}
      >
        <PauseIcon className={iconClass} />
      </div>
    );
  }
  return null;
};

const EndButton = ({ setPlayState }: ButtonProps) => {
  return (
    <div
      className="flex-1 flex items-center justify-center cursor-pointer h-full"
      onClick={() => setPlayState('cancel')}
    >
      <StopIcon className={endClass} />
    </div>
  );
};


const SaveButton = ({ onClick }: DocButtonProps) => (
  <div className="flex-1 flex items-center justify-center cursor-pointer h-full" onClick={onClick}>
    <DocumentArrowDownIcon className={iconClass} />
  </div>
);

const LoadButton = ({ onClick }: DocButtonProps) => (
  <div className="flex-1 flex items-center justify-center cursor-pointer h-full" onClick={onClick}>
    <FolderOpenIcon className={iconClass} />
  </div>
);

const ButtonGroup = ({ playState, setPlayState, onSaveClick, onLoadClick }: ButtonGroupProps) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white flex items-center text-center shadow-md h-16 border-t border-gray-300">
    <StartButton playState={playState} setPlayState={setPlayState} />
    <StopButton playState={playState} setPlayState={setPlayState} />
    <EndButton playState={playState} setPlayState={setPlayState} />
    <SaveButton onClick={onSaveClick} />
    <LoadButton onClick={onLoadClick} />
  </div>
);

export default ButtonGroup;
