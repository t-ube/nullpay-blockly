import React, { useEffect, useState } from 'react';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import { useMobile } from '@/contexts/MobileContext';

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
  isSmall: boolean;
}

interface DocButtonProps {
  onClick: () => void;
  isSmall: boolean;
}

const buttonClass = "flex items-center px-2 py-1 text-sm bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200";

const StartButton = ({ playState, setPlayState, isSmall } : ButtonProps) => {
  if (playState === 'start' || playState === 'resume') {
    return null;
  } else if (playState === 'init' || playState === 'cancel') {
    return (
      <button
        id="executeCodeButton"
        className={buttonClass}
        onClick={() => setPlayState('start')}
      >
        <PlayIcon className="h-4 w-4 mr-1"/>{!isSmall && "Run"}
      </button>
    );
  }
  return (
    <button
      id="resumeExecutionButton"
      className={buttonClass}
      onClick={() => setPlayState('resume')}
    >
      <PlayIcon className="h-4 w-4 mr-1"/>{!isSmall && "Run"}
    </button>
  );
};

const StopButton = ({ playState, setPlayState, isSmall } : ButtonProps) => {
  if (playState === 'start' || playState === 'resume') {
    return (
      <button
        id="suspendExecutionButton"
        className="flex items-center px-2 py-1 text-sm bg-yellow-500 text-white rounded shadow hover:bg-yellow-700 transition duration-200"
        onClick={() => setPlayState('suspend')}
      >
        <PauseIcon className="h-4 w-4 mr-1"/>{!isSmall && "Pause"}
      </button>
    );
  }
  return null;
};

const EndButton = ({ setPlayState, isSmall } : ButtonProps) => {
  const isDisabled = false;
  return (
    <button
      id="cancelExecutionButton"
      className={`flex items-center px-2 py-1 text-sm text-white rounded shadow hover:bg-red-700 transition duration-200 ${
        isDisabled ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
      }`}
      disabled={isDisabled}
      onClick={() => setPlayState('cancel')}
    >
      <StopIcon className="h-4 w-4 mr-1" />{!isSmall && "End"}
    </button>
  );
};

const SaveButton = ({ onClick, isSmall }: DocButtonProps) => (
  <button
    id="saveWorkspaceButton"
    className="flex items-center px-2 py-1 text-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-700 transition duration-200"
    onClick={onClick}
  >
    <DocumentArrowDownIcon className="h-4 w-4 mr-1" />{!isSmall && "Save"}
  </button>
);

const LoadButton = ({ onClick, isSmall }: DocButtonProps) => (
  <button
    id="loadWorkspaceButton"
    className="flex items-center px-2 py-1 text-sm bg-purple-500 text-white rounded shadow hover:bg-purple-700 transition duration-200"
    onClick={onClick}
  >
    <FolderOpenIcon className="h-4 w-4 mr-1" />{!isSmall && "Load"}
  </button>
);

const ButtonGroup = ({ playState, setPlayState, onSaveClick, onLoadClick } : ButtonGroupProps) => {
  const { isMobile, isPortrait, isLoaded } = useMobile();
  const [ isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setIsSmall(isMobile && !isPortrait);
  }, [isMobile, isPortrait, isLoaded]);

  return (
    <div className="flex items-center px-2 space-x-1">
      <StartButton isSmall={isSmall} playState={playState} setPlayState={setPlayState} />
      <StopButton isSmall={isSmall} playState={playState} setPlayState={setPlayState} />
      <EndButton isSmall={isSmall} playState={playState} setPlayState={setPlayState} />
      <div className="border-l border-gray-300 h-6 mx-2"></div>
      <SaveButton isSmall={isSmall} onClick={onSaveClick} />
      <LoadButton isSmall={isSmall} onClick={onLoadClick}/>
    </div>
  );
}

export default ButtonGroup;
