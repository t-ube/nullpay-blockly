import React from 'react';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import { PlayState } from '@/types/PlayStateType';

interface IButtonGroupProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
}

const StartButton = ({ playState, setPlayState } : IButtonGroupProps) => {
  if (playState === 'start' || playState === 'resume') {
    return null;
  } else if (playState === 'init' || playState === 'cancel') {
    return (
      <button
        id="executeCodeButton"
        className="flex items-center px-3 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200"
        onClick={() => setPlayState('start')}
      >
        <PlayIcon className="h-5 w-5 mr-2"/>Run
      </button>
    );
  }
  return (
    <button
      id="resumeExecutionButton"
      className="flex items-center px-3 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200"
      onClick={() => setPlayState('resume')}
    >
      <PlayIcon className="h-5 w-5 mr-2"/>Run
    </button>
  );
};

const StopButton = ({ playState, setPlayState } : IButtonGroupProps) => {
  if (playState === 'start' || playState === 'resume') {
    return (
      <button
        id="suspendExecutionButton"
        className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-700 transition duration-200"
        onClick={() => setPlayState('suspend')}
      >
        <PauseIcon className="h-5 w-5 mr-2"/>Pause
      </button>
    );
  }
  return null;
};

const EndButton = ({ setPlayState } : IButtonGroupProps) => {
  const isDisabled = false;
  return (
    <button
      id="cancelExecutionButton"
      className={`flex items-center px-3 py-2 text-white rounded shadow hover:bg-red-700 transition duration-200 ${
        isDisabled ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
      }`}
      disabled={isDisabled}
      onClick={() => setPlayState('cancel')}
    >
      <StopIcon className="h-5 w-5 mr-2" />End
    </button>
  );
};

const SaveButton = () => (
  <button id="saveWorkspaceButton" className="flex items-center px-3 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-700 transition duration-200">
    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />Save
  </button>
);

const LoadButton = () => (
  <button id="loadWorkspaceButton" className="flex items-center px-3 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-700 transition duration-200">
    <FolderOpenIcon className="h-5 w-5 mr-2" />Load
  </button>
);

const ButtonGroup = ({ playState, setPlayState } : IButtonGroupProps) => (
  <>
    <StartButton playState={playState} setPlayState={setPlayState} />
    <StopButton playState={playState} setPlayState={setPlayState} />
    <EndButton playState={playState} setPlayState={setPlayState} />
    <div className="border-l border-gray-300 h-10 mx-2"></div>
    <SaveButton />
    <LoadButton />
  </>
);

export default ButtonGroup;
