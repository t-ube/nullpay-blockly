import React from 'react';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';

export type PlayState = 'start' | 'resume' | 'init' | 'cancel' | 'suspend';

interface ButtonGroupProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
}

const buttonClass = "flex items-center px-2 py-1 text-sm bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200";

const StartButton = ({ playState, setPlayState } : ButtonGroupProps) => {
  if (playState === 'start' || playState === 'resume') {
    return null;
  } else if (playState === 'init' || playState === 'cancel') {
    return (
      <button
        id="executeCodeButton"
        className={buttonClass}
        onClick={() => setPlayState('start')}
      >
        <PlayIcon className="h-4 w-4 mr-1"/>Run
      </button>
    );
  }
  return (
    <button
      id="resumeExecutionButton"
      className={buttonClass}
      onClick={() => setPlayState('resume')}
    >
      <PlayIcon className="h-4 w-4 mr-1"/>Run
    </button>
  );
};

const StopButton = ({ playState, setPlayState } : ButtonGroupProps) => {
  if (playState === 'start' || playState === 'resume') {
    return (
      <button
        id="suspendExecutionButton"
        className="flex items-center px-2 py-1 text-sm bg-yellow-500 text-white rounded shadow hover:bg-yellow-700 transition duration-200"
        onClick={() => setPlayState('suspend')}
      >
        <PauseIcon className="h-4 w-4 mr-1"/>Pause
      </button>
    );
  }
  return null;
};

const EndButton = ({ setPlayState } : ButtonGroupProps) => {
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
      <StopIcon className="h-4 w-4 mr-1" />End
    </button>
  );
};

const SaveButton = () => (
  <button id="saveWorkspaceButton" className="flex items-center px-2 py-1 text-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-700 transition duration-200">
    <DocumentArrowDownIcon className="h-4 w-4 mr-1" />Save
  </button>
);

const LoadButton = () => (
  <button id="loadWorkspaceButton" className="flex items-center px-2 py-1 text-sm bg-purple-500 text-white rounded shadow hover:bg-purple-700 transition duration-200">
    <FolderOpenIcon className="h-4 w-4 mr-1" />Load
  </button>
);

const ButtonGroup = ({ playState, setPlayState } : ButtonGroupProps) => (
  <div className="flex items-center space-x-1">
    <StartButton playState={playState} setPlayState={setPlayState} />
    <StopButton playState={playState} setPlayState={setPlayState} />
    <EndButton playState={playState} setPlayState={setPlayState} />
    <div className="border-l border-gray-300 h-6 mx-2"></div>
    <SaveButton />
    <LoadButton />
  </div>
);

export default ButtonGroup;
