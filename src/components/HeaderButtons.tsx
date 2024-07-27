import React, { useEffect, useState } from 'react';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import { useMobile } from '@/contexts/MobileContext';
import { IButtonProps, IDocButtonProps, IButtonGroupProps } from '@/interfaces/IHeaderProps';


const buttonClass = "flex items-center px-2 py-1 text-sm bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200";

const StartButton = ({ playState, setPlayState, isSmall } : IButtonProps) => {
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

const StopButton = ({ playState, setPlayState, isSmall } : IButtonProps) => {
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

const EndButton = ({ setPlayState, isSmall } : IButtonProps) => {
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
      <StopIcon className="h-4 w-4 mr-1"/>{!isSmall && "End"}
    </button>
  );
};

const SaveButton = ({ onClick, isSmall }: IDocButtonProps) => (
  <button
    id="saveWorkspaceButton"
    className="flex items-center px-2 py-1 text-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-700 transition duration-200"
    onClick={onClick}
  >
    <DocumentArrowDownIcon className="h-4 w-4 mr-1" />{!isSmall && "Save"}
  </button>
);

const LoadButton = ({ onClick, isSmall }: IDocButtonProps) => (
  <button
    id="loadWorkspaceButton"
    className="flex items-center px-2 py-1 text-sm bg-purple-500 text-white rounded shadow hover:bg-purple-700 transition duration-200"
    onClick={onClick}
  >
    <FolderOpenIcon className="h-4 w-4 mr-1" />{!isSmall && "Load"}
  </button>
);

const SaveMLButton = ({ onClick, isSmall }: IDocButtonProps) => (
  <button
    id="saveMlWorkspaceButton"
    className="flex items-center px-2 py-1 text-sm bg-sky-500 text-white rounded shadow hover:bg-sky-700 transition duration-200"
    onClick={onClick}
  >
    <DocumentArrowDownIcon className="h-4 w-4 mr-1" />{!isSmall && "SaveML"}
  </button>
);

const ButtonGroup = ({ playState, setPlayState, onSaveClick, onLoadClick, onSaveMLClick } : IButtonGroupProps) => {
  const { isMobile, isPortrait, isLoaded } = useMobile();
  const [ isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setIsSmall(isMobile && !isPortrait);
  }, [isMobile, isPortrait, isLoaded]);

  return (
    <div className="flex items-center px-2 space-x-1">
      <StartButton isSmall={isMobile} playState={playState} setPlayState={setPlayState} />
      <StopButton isSmall={isMobile} playState={playState} setPlayState={setPlayState} />
      <EndButton isSmall={isMobile} playState={playState} setPlayState={setPlayState} />
      <div className="border-l border-gray-300 h-6 mx-2"></div>
      <SaveButton isSmall={isMobile} onClick={onSaveClick}/>
      <LoadButton isSmall={isMobile} onClick={onLoadClick}/>
      <div className="border-l border-gray-300 h-6 mx-2"></div>
      <SaveMLButton isSmall={isMobile} onClick={onSaveMLClick}/>
    </div>
  );
}

export default ButtonGroup;
